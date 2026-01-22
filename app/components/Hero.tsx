import { ArrowRight, TrendingUp, Users, Award } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero-gradient py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Dominate Google with 
              <span className="gradient-text"> Professional SEO</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Drive more qualified traffic, increase conversions, and grow your revenue with 
              data-driven SEO strategies that deliver measurable results.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">300%</div>
                <div className="text-sm text-gray-600">Avg Traffic Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">150+</div>
                <div className="text-sm text-gray-600">Clients Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">95%</div>
                <div className="text-sm text-gray-600">Client Retention</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg flex items-center justify-center group"
              >
                Get Free SEO Audit
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg hover:bg-primary-600 hover:text-white transition-colors font-semibold text-lg"
              >
                View Our Services
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Trusted by businesses worldwide</p>
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span className="text-sm">Google Partner</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">5+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm">Proven Results</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">SEO Performance Dashboard</h3>
                <p className="text-gray-600">Real results from our clients</p>
              </div>
              
              {/* Mock Dashboard */}
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Organic Traffic</div>
                    <div className="text-2xl font-bold text-green-600">+247%</div>
                  </div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Keywords Ranking</div>
                    <div className="text-2xl font-bold text-blue-600">1,247</div>
                  </div>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Conversion Rate</div>
                    <div className="text-2xl font-bold text-purple-600">+89%</div>
                  </div>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}