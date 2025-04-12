import { Link } from "react-router-dom";
import { SignUpForm } from "../features/auth/components/SignUpForm";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-2xl overflow-hidden shadow-lg bg-card/70 backdrop-blur-sm">
        {/* Form Column */}
        <div className="p-6 sm:p-8 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Join OrderFlow
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          <SignUpForm />

          <div className="mt-6">
            <p className="text-xs text-center text-muted-foreground">
              By signing up, you agree to our{" "}
              <a
                href="#"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* Marketing Column */}
        <div className="hidden lg:block bg-gradient-to-br from-primary/10 to-secondary/30 p-8 relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="relative h-full flex flex-col">
            <div className="flex justify-center mb-8">
              <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-primary"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                Streamline Your Order Management
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-8">
                Join thousands of businesses using OrderFlow to simplify
                operations and boost productivity.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center p-3 rounded-lg bg-background/40 backdrop-blur-sm border border-border/30">
                <div className="bg-primary/10 p-2 rounded-md mr-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Easy Setup</div>
                  <div className="text-sm text-muted-foreground">
                    Get started in minutes
                  </div>
                </div>
              </div>

              <div className="flex items-center p-3 rounded-lg bg-background/40 backdrop-blur-sm border border-border/30">
                <div className="bg-primary/10 p-2 rounded-md mr-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 20V10"></path>
                    <path d="M18 20V4"></path>
                    <path d="M6 20v-6"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Powerful Analytics</div>
                  <div className="text-sm text-muted-foreground">
                    Make data-driven decisions
                  </div>
                </div>
              </div>

              <div className="flex items-center p-3 rounded-lg bg-background/40 backdrop-blur-sm border border-border/30">
                <div className="bg-primary/10 p-2 rounded-md mr-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-medium">24/7 Support</div>
                  <div className="text-sm text-muted-foreground">
                    We're always here to help
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
