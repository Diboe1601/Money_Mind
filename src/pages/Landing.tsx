import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/forms/contact-form";
import SpotlightCard from "@/components/ui/spotlight-card";
import { 
  ArrowRight, 
  BarChart3, 
  DollarSign, 
  Shield, 
  Zap, 
  Users,
  TrendingUp,
  CheckCircle,
  Home,
  HelpCircle,
  Info,
  Mail,
  X
} from "lucide-react";
import { MotionConfig, motion, AnimatePresence } from "framer-motion";

const Landing = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Video Modal */}
      {showVideoModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <div 
            className="relative w-full max-w-5xl bg-gradient-card rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>
            <video
              controls
              autoPlay
              className="w-full h-auto"
            >
              <source src={`${import.meta.env.BASE_URL}MoneyMind_Demo.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-gradient-card border-b border-border px-6 py-4 shadow-elevated sticky top-0 z-50 backdrop-blur-sm">
        <div className="relative max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src={`${import.meta.env.BASE_URL}MoneyMind_Logo.png`} 
              alt="MoneyMind Logo" 
              className="h-8 w-auto object-contain"
            />
            <h1 className="text-xl font-bold font-heading text-foreground">MoneyMind</h1>
          </div>
          
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
              <span>How it Works</span>
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <Info className="h-4 w-4" />
              <span>About</span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </button>
          </div>

          {/* Mobile Hamburger (only on mobile) */}
          <div className="md:hidden">
            <AnimatedHamburgerButton
              active={mobileMenuOpen}
              onToggle={() => setMobileMenuOpen((pv) => !pv)}
            />
          </div>

          {/* Desktop Auth Buttons (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/auth">
              <Button variant="outline" className="border-border/50 hover:bg-background/10">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-primary hover:bg-primary-hover shadow-elevated">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute top-16 right-6 z-50 w-44 rounded-lg border border-border bg-gradient-card shadow-elevated p-3 md:hidden"
              >
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full mb-2 border-border/50 hover:bg-background/10"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-primary hover:bg-primary-hover shadow-elevated">
                    Sign Up
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-heading text-foreground mb-6">
            Master Your Business
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Financial Future
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Comprehensive financial booking system designed for small and intermediate businesses. 
            Track transactions, generate insights, and maintain accurate financial records with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-primary hover:bg-primary-hover shadow-elevated">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={() => setShowVideoModal(true)}>
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-gradient-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
              How MoneyMind Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes with our simple 3-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SpotlightCard className="p-8 text-center" spotlightColor="rgba(132, 94, 194, 0.3)">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold font-heading text-foreground mb-3">Sign Up</h3>
              <p className="text-muted-foreground">
                Create your free account in seconds. No credit card required to get started.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-8 text-center" spotlightColor="rgba(132, 94, 194, 0.3)">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold font-heading text-foreground mb-3">Connect</h3>
              <p className="text-muted-foreground">
                Add your transactions and set up budgets. Our AI helps categorize everything automatically.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-8 text-center" spotlightColor="rgba(132, 94, 194, 0.3)">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold font-heading text-foreground mb-3">Thrive</h3>
              <p className="text-muted-foreground">
                Get insights, track progress, and watch your financial goals become reality.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
              Everything You Need to Manage Your Finances
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed specifically for small and intermediate businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<DollarSign className="h-8 w-8" />}
              title="Transaction Management"
              description="Streamline recording, categorizing, and tracking of all business transactions with smart automation."
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8" />}
              title="Financial Insights"
              description="Get actionable business intelligence through data visualization and comprehensive reporting."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Secure & Compliant"
              description="Bank-level security with automated backups and compliance tools for tax regulations."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="AI-Powered Analytics"
              description="Automatic transaction categorization and expense pattern recognition using machine learning."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Multi-User Access"
              description="Collaborate with your team, accountants, and bookkeepers with role-based permissions."
            />
            <FeatureCard
              icon={<TrendingUp className="h-8 w-8" />}
              title="Growth Tracking"
              description="Monitor your business growth with revenue forecasting and profitability analysis."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gradient-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-6">
                About MoneyMind
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                MoneyMind was created with a simple mission: to make financial management accessible, 
                intuitive, and powerful for everyone.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                We believe that everyone deserves the tools to understand and control their finances. 
                Our AI-powered platform combines cutting-edge technology with user-friendly design to 
                help you make smarter financial decisions.
              </p>
              <p className="text-lg text-muted-foreground">
                Whether you're tracking daily expenses, managing budgets, or planning for the future, 
                MoneyMind is your trusted partner on the journey to financial wellness.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <StatCard number="50K+" label="Transactions Processed" />
              <StatCard number="1000+" label="Happy Businesses" />
              <StatCard number="99.9%" label="Uptime Guarantee" />
              <StatCard number="24/7" label="Support Available" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-6">
                Why Choose MoneyMind?
              </h2>
              <div className="space-y-6">
                <BenefitItem
                  icon={<CheckCircle className="h-5 w-5 text-success" />}
                  title="Save 10+ Hours Weekly"
                  description="Automate repetitive financial tasks and focus on growing your business"
                />
                <BenefitItem
                  icon={<CheckCircle className="h-5 w-5 text-success" />}
                  title="Reduce Errors by 95%"
                  description="Eliminate manual data entry mistakes with smart categorization"
                />
                <BenefitItem
                  icon={<CheckCircle className="h-5 w-5 text-success" />}
                  title="Make Better Decisions"
                  description="Get real-time insights into your business financial health"
                />
                <BenefitItem
                  icon={<CheckCircle className="h-5 w-5 text-success" />}
                  title="Stay Tax-Ready"
                  description="Generate tax reports instantly with our compliance tools"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <StatCard number="50K+" label="Active Users" />
              <StatCard number="$2M+" label="Managed Monthly" />
              <StatCard number="98%" label="Satisfaction Rate" />
              <StatCard number="24/7" label="Customer Support" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-card">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <SpotlightCard className="p-8" spotlightColor="rgba(132, 94, 194, 0.3)">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold font-heading text-foreground mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-muted-foreground">support@moneymind.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Community</p>
                      <p className="text-muted-foreground">Join our Discord server</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Help Center</p>
                      <p className="text-muted-foreground">Visit our documentation</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold font-heading text-foreground mb-4">Quick Message</h3>
                <ContactForm />
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-6">
            Ready to Transform Your Financial Management?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of businesses already using MoneyMind to streamline their finances
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-gradient-primary hover:bg-primary-hover shadow-elevated">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img 
              src={`${import.meta.env.BASE_URL}MoneyMind_Logo.png`} 
              alt="MoneyMind Logo" 
              className="h-8 w-auto object-contain"
            />
            <span className="text-xl font-bold font-heading text-foreground">MoneyMind</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 MoneyMind. All rights reserved. Empowering businesses with intelligent financial management.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <SpotlightCard className="p-6 shadow-card hover:shadow-elevated transition-all duration-300" spotlightColor="rgba(132, 94, 194, 0.25)">
    <div className="text-primary mb-4">{icon}</div>
    <h3 className="text-xl font-semibold font-heading text-foreground mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </SpotlightCard>
);

const BenefitItem = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex items-start space-x-3">
    {icon}
    <div>
      <h4 className="font-semibold text-foreground mb-1">{title}</h4>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

const StatCard = ({ number, label }: { number: string; label: string }) => (
  <SpotlightCard className="p-6 text-center" spotlightColor="rgba(132, 94, 194, 0.25)">
    <div className="text-2xl font-bold text-primary mb-2">{number}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </SpotlightCard>
);

// Mobile Animated Hamburger Button (framer-motion)
type AnimatedHamburgerButtonProps = { active: boolean; onToggle: () => void };

const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: { rotate: ["0deg", "0deg", "-45deg"] },
    closed: { rotate: ["-45deg", "0deg", "0deg"] },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "calc(50% + 8px)",
    },
  },
};

const AnimatedHamburgerButton: React.FC<AnimatedHamburgerButtonProps> = ({ active, onToggle }) => {
  return (
    <MotionConfig transition={{ duration: 0.5, ease: "easeInOut" }}>
      <motion.button
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={onToggle}
        aria-label="Toggle menu"
        className="relative h-10 w-10 rounded-full bg-white/0 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-0.5 w-6 bg-white"
          style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute h-0.5 w-6 bg-white"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute h-0.5 w-4 bg-white"
          style={{ x: "-50%", y: "50%", bottom: "35%", left: "calc(50% + 8px)" }}
        />
      </motion.button>
    </MotionConfig>
  );
};

export default Landing;