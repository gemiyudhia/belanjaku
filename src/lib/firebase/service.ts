import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { app, auth } from "./init";

const firestore = getFirestore(app);

export async function register(data: {
  email: string;
  password: string;
  role?: string;
}) {
  if (!data.email || !data.password) {
    return { status: false, statusCode: 400, message: "Invalid input data" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(data.email)) {
    return { status: false, statusCode: 400, message: "Invalid email format" };
  }

  if (data.password.length < 8) {
    return {
      status: false,
      statusCode: 400,
      message: "Password must at least 8 characters",
    };
  }

  // validasi apakah email sudah digunakan atau belum
  const emailQuery = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );

  const emailSnapshot = await getDocs(emailQuery);

  if (!emailSnapshot.empty) {
    return { status: false, statusCode: 400, message: "Email already in use" };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    // kirim email verifikasi
    await sendEmailVerification(userCredential.user);

    // simpan data pengguna ke firestore
    const userId = userCredential.user.uid;
    await setDoc(doc(firestore, "users", userId), {
      email: data.email,
      role: data.role || "user",
      createdAt: new Date(),

      userId,
    });

    return {
      status: true,
      statusCode: 200,
      message: "Register success.",
    };

  } catch (error: unknown) {
    if (error instanceof Error) {
      return { status: false, statusCode: 400, mesaage: error.message };
    }

    return { status: false, statusCode: 400, message: "Register failed" };
  }
}
