import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-sm text-muted-foreground">
              MyStore is your one-stop shop for all your needs. We offer a wide
              range of high-quality products at competitive prices.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Products", "Categories", "About", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              {[
                "FAQ",
                "Shipping",
                "Returns",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Stay updated with our latest offers and products.
            </p>
            <form className="space-y-2">
              <Input type="email" placeholder="Enter your email" />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2023 MyStore. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
