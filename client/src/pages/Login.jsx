import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LeafLogo from "../components/LeafLogo.jsx";
import { useToast } from "../components/ToastProvider.jsx";
import { loginStaff } from "../utils/auth.js";
import { loginStaffUser } from "../utils/api.js";
import { addNotification } from "../utils/notifications.js";

const demoStaffAccounts = [
  {
    name: "Alice Kamau",
    email: "alice@peacebond.org",
    password: "123456",
  },
  {
    name: "John Mwangi",
    email: "john@peacebond.org",
    password: "123456",
  },
  {
    name: "Fatima Noor",
    email: "fatima@peacebond.org",
    password: "123456",
  },
];

function Login() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function authenticateStaff(nextEmail, nextPassword) {
    setError("");

    if (!nextEmail.trim() || !nextPassword.trim()) {
      const validationMessage = "Enter a staff email and password to continue.";
      setError(validationMessage);
      showToast({
        title: "Login needs details",
        message: validationMessage,
        type: "warning",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const staff = await loginStaffUser(nextEmail, nextPassword);
      loginStaff(staff);
      addNotification({
        title: "Staff login",
        message: `${staff.name} signed in to continue PeaceBond case work.`,
        type: "login",
      });
      showToast({
        title: "Welcome back",
        message: `${staff.name} can now continue PeaceBond case work.`,
        type: "success",
      });
      navigate("/dashboard");
    } catch (requestError) {
      const errorMessage =
        requestError.response?.data?.message ||
        "Login failed. Check your staff credentials and MongoDB connection.";
      setError(errorMessage);
      showToast({
        title: "Login failed",
        message: errorMessage,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    authenticateStaff(email, password);
  }

  function handleDemoLogin(account) {
    setEmail(account.email);
    setPassword(account.password);
    authenticateStaff(account.email, account.password);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#f7efe4_0%,#efe0cc_48%,#f8f1e8_100%)] px-5 py-16 text-earth-soil">
      <Link
        className="absolute left-5 top-5 inline-flex items-center rounded-full border border-earth-soil/15 bg-white/50 px-4 py-2 text-sm font-semibold text-earth-soil shadow-sm transition hover:border-earth-clay hover:bg-white hover:text-earth-clay sm:left-8 sm:top-8"
        to="/"
      >
        Back to PeaceBond
      </Link>

      <section className="animate-fade-up w-full max-w-md">
        <div className="rounded-lg border border-white/70 bg-white/90 p-6 shadow-xl shadow-earth-soil/10 backdrop-blur sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <LeafLogo className="h-11 w-11" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-earth-clay">
                  Staff access
                </p>
                <p className="mt-1 text-sm text-stone-500">PeaceBond</p>
              </div>
            </div>
          </div>

          <h1 className="mt-6 text-3xl font-semibold">Mediator login</h1>
          <p className="mt-3 text-base leading-7 text-stone-600">
            Sign in to prepare PeaceBonds and support community repair cases.
          </p>
          <p className="mt-3 rounded-lg bg-earth-sand/75 px-4 py-3 text-sm leading-6 text-stone-700">
            Guided by dignity, repair, and community return.
          </p>

          <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-semibold" htmlFor="email">
                Email
              </label>
              <input
                className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
                id="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="mediator@peacebond.local"
                type="email"
                value={email}
              />
            </div>

            <div>
              <label className="text-sm font-semibold" htmlFor="password">
                Password
              </label>
              <input
                className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-earth-clay focus:ring-2 focus:ring-earth-clay/20"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Demo: peacebond123"
                type="password"
                value={password}
              />
            </div>

            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </p>
            )}

            <button
              className="rounded-lg bg-earth-soil px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-stone-700 hover:shadow-md disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-stone-400"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Checking credentials..." : "Login"}
            </button>
          </form>

          <div className="mt-5 rounded-lg border border-earth-clay/20 bg-earth-sand/70 p-4">
            <p className="text-sm font-semibold text-earth-soil">Demo staff accounts</p>
            <div className="mt-3 grid gap-2">
              {demoStaffAccounts.map((account) => (
                <button
                  className="rounded-lg border border-stone-200 bg-white px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-earth-clay hover:shadow-md disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
                  disabled={isSubmitting}
                  key={account.email}
                  onClick={() => handleDemoLogin(account)}
                  type="button"
                >
                  <span className="block text-sm font-semibold text-earth-soil">
                    {account.name}
                  </span>
                  <span className="block text-sm text-stone-600">{account.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
