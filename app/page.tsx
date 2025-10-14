import NetworkGraph from '@/components/NetworkGraph';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      <NetworkGraph />
      <Navbar />

      <main className="min-h-screen relative z-10 pt-16">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
              EY Tech Tacos
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Serving up innovation, one byte at a time. Where technology meets creativity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                className="px-8 py-4 bg-primary text-primary-foreground font-semibold border-2 border-border hover:translate-x-1 hover:translate-y-1 transition-transform"
                style={{ boxShadow: 'var(--shadow-md)' }}
              >
                Get Started
              </button>
              <button
                className="px-8 py-4 bg-secondary text-secondary-foreground font-semibold border-2 border-border hover:translate-x-1 hover:translate-y-1 transition-transform"
                style={{ boxShadow: 'var(--shadow-md)' }}
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Innovation',
                  description: 'Cutting-edge solutions for modern challenges',
                  icon: '💡',
                },
                {
                  title: 'Collaboration',
                  description: 'Building together, growing together',
                  icon: '🤝',
                },
                {
                  title: 'Excellence',
                  description: 'Quality in every line of code',
                  icon: '⚡',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-card border-2 border-border p-8 hover:translate-x-1 hover:translate-y-1 transition-transform"
                  style={{ boxShadow: 'var(--shadow-lg)' }}
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Projects', value: '500+' },
                { label: 'Developers', value: '100+' },
                { label: 'Countries', value: '25+' },
                { label: 'Lines of Code', value: '10M+' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-card border-2 border-border"
                  style={{ boxShadow: 'var(--shadow)' }}
                >
                  <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm sm:text-base text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Ready to Join Us?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Let's build something amazing together. Start your journey today.
            </p>
            <button
              className="px-12 py-5 bg-primary text-primary-foreground font-bold text-lg border-2 border-border hover:translate-x-1 hover:translate-y-1 transition-transform"
              style={{ boxShadow: 'var(--shadow-xl)' }}
            >
              Contact Us
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t-2 border-border">
          <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
            <p>© 2025 EY Tech Tacos. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
