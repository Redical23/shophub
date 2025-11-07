"use client"

export default function Footer() {
  return (
    <footer className="bg-muted-bg border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 from-neutral-50 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="font-bold text-lg mb-4">ShopHub</h4>
            <p className="text-sm text-muted">Your ultimate destination for premium electronics and accessories.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted hover:text-foreground">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-foreground">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-foreground">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted hover:text-foreground">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-foreground">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-foreground">
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted hover:text-foreground">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-foreground">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-foreground">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted">
          <p>&copy; 2025 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}