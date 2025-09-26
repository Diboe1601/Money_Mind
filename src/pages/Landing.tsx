import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BarChart3, 
  DollarSign, 
  Shield, 
  Zap, 
  Users,
  TrendingUp,
  PieChart,
  CreditCard,
  FileText,
  CheckCircle
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="bg-gradient-card border-b border-border px-6 py-4 shadow-elevated">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <h1 className="text-xl font-bold font-heading text-foreground">MoneyMind</h1>
          </div>
          
          <div className="flex gap-3">
            <Link to="/signup">
              <Button variant="outline" className="border-border/50 hover:bg-background/10">
                Sign Up
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-primary hover:bg-primary-hover shadow-elevated">
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
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
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-primary hover:bg-primary-hover shadow-elevated">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
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

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gradient-card">
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
              <StatCard number="50K+" label="Transactions Processed" />
              <StatCard number="1000+" label="Happy Businesses" />
              <StatCard number="99.9%" label="Uptime Guarantee" />
              <StatCard number="24/7" label="Support Available" />
            </div>
          </div>
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
          <Link to="/auth">
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
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
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
  <div className="bg-gradient-card rounded-lg p-6 shadow-card hover:shadow-elevated transition-all duration-300">
    <div className="text-primary mb-4">{icon}</div>
    <h3 className="text-xl font-semibold font-heading text-foreground mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
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
  <div className="bg-gradient-card rounded-lg p-6 shadow-card text-center">
    <div className="text-2xl font-bold text-primary mb-2">{number}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

export default Landing;