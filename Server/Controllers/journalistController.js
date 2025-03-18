const Journalist = require("../Models/JournalistModel");
const multer = require("multer");
const path = require("path");
const { verifyToken } = require("./authController"); // استيراد دالة فك التوكن

// إعداد Multer لتخزين الصور
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // تأكد من وجود مجلد "uploads"
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// إنشاء صحفي جديد
const createJournalist = async (req, res) => {
  try {
    console.log("Request Headers:", req.headers); // تحقق من الهيدر
    console.log("Request Body:", req.body); // تحقق من البيانات المرسلة
    console.log("Request File:", req.file); // تحقق من الملف المرسل

    const token = req.headers.authorization.split(" ")[1]; // جلب التوكن من الهيدر
    console.log("Token:", token); // تحقق من التوكن

    const decoded = verifyToken(token); // فك التوكن
    console.log("Decoded Token:", decoded); // تحقق من التوكن المفكوك

    const { fullName, portfolio, bio } = req.body;
    const userId = decoded._id; // استخراج userId من التوكن
    const email = decoded.email; // استخراج email من التوكن
    const profileImage = req.file ? req.file.path : null;

    console.log("Extracted Data:", { userId, email, fullName, portfolio, bio, profileImage }); // تحقق من البيانات المستخرجة

    if (!fullName || !portfolio || !bio || !profileImage) {
      console.log("Validation Error: جميع الحقول مطلوبة");
      return res.status(400).json({ message: "All Data required " });
    }

    const existingJournalist = await Journalist.findOne({ userId });
if (existingJournalist) {
  return res.status(400).json({ message: "User has already applied" });
}

    const journalist = new Journalist({
      userId,
      email,
      fullName,
      portfolio,
      bio,
      profileImage,
    });

    await journalist.save();
    console.log("Journalist Saved Successfully:", journalist); // تحقق من البيانات المحفوظة
    res.status(201).json({ message: "تم تقديم الطلب بنجاح", journalist });
  } catch (error) {
    console.error("Error in createJournalist:", error); // عرض الخطأ بالتفصيل
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};

// جلب جميع الصحفيين
const getAllJournalists = async (req, res) => {
  try {
    const journalists = await Journalist.find();
    console.log("All Journalists:", journalists); // تحقق من البيانات المسترجعة
    res.status(200).json(journalists);
  } catch (error) {
    console.error("Error in getAllJournalists:", error); // عرض الخطأ بالتفصيل
    res.status(500).json({ message: "خطأ في جلب الصحفيين", error: error.message });
  }
};

// جلب صحفي واحد عبر ID
const getJournalistById = async (req, res) => {
  try {
    const journalist = await Journalist.findById(req.params.id);
    if (!journalist) {
      console.log("Journalist Not Found Error: الصحفي غير موجود");
      return res.status(404).json({ message: "الصحفي غير موجود" });
    }
    console.log("Journalist Found:", journalist); // تحقق من البيانات المسترجعة
    res.status(200).json(journalist);
  } catch (error) {
    console.error("Error in getJournalistById:", error); // عرض الخطأ بالتفصيل
    res.status(500).json({ message: "خطأ في جلب بيانات الصحفي", error: error.message });
  }
};

// جلب صحفي عبر userId
const getJournalistByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const journalist = await Journalist.findOne({ userId });
    if (!journalist) {
      return res.status(404).json({ message: "الصحفي غير موجود" });
    }
    res.status(200).json(journalist);
  } catch (error) {
    console.error("Error in getJournalistByUserId:", error);
    res.status(500).json({ message: "خطأ في جلب بيانات الصحفي", error: error.message });
  }
};


// تحديث بيانات الصحفي
const updateJournalist = async (req, res) => {
  try {
    const journalist = await Journalist.findById(req.params.id);
    if (!journalist) {
      console.log("Journalist Not Found Error: الصحفي غير موجود");
      return res.status(404).json({ message: "الصحفي غير موجود" });
    }

    const { fullName, portfolio, bio, status } = req.body;
    if (fullName) journalist.fullName = fullName;
    if (portfolio) journalist.portfolio = portfolio;
    if (bio) journalist.bio = bio;
    if (status) journalist.status = status;
    if (req.file) journalist.profileImage = req.file.path;

    await journalist.save();
    console.log("Journalist Updated Successfully:", journalist); // تحقق من البيانات المحدثة
    res.status(200).json({ message: "تم التحديث بنجاح", journalist });
  } catch (error) {
    console.error("Error in updateJournalist:", error); // عرض الخطأ بالتفصيل
    res.status(500).json({ message: "خطأ في التحديث", error: error.message });
  }
};

// حذف صحفي
const deleteJournalist = async (req, res) => {
  try {
    const journalist = await Journalist.findById(req.params.id);
    if (!journalist) {
      console.log("Journalist Not Found Error: الصحفي غير موجود");
      return res.status(404).json({ message: "الصحفي غير موجود" });
    }

    await journalist.deleteOne();
    console.log("Journalist Deleted Successfully:", journalist); // تحقق من البيانات المحذوفة
    res.status(200).json({ message: "تم الحذف بنجاح" });
  } catch (error) {
    console.error("Error in deleteJournalist:", error); // عرض الخطأ بالتفصيل
    res.status(500).json({ message: "خطأ في الحذف", error: error.message });
  }
};

module.exports = {
  upload,
  createJournalist,
  getAllJournalists,
  getJournalistById,
  getJournalistByUserId,
  updateJournalist,
  deleteJournalist,
};