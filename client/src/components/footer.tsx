import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-white font-inter font-bold text-2xl">
                Secondli<span className="text-secondary">.xyz</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4 font-roboto text-sm">
              Revolutionizing real estate with AI-powered insights and a seamless property search experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4 font-inter">Quick Links</h3>
            <ul className="space-y-2 font-roboto">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-white">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/properties">
                  <a className="text-gray-400 hover:text-white">Properties</a>
                </Link>
              </li>
              <li>
                <Link href="/agents">
                  <a className="text-gray-400 hover:text-white">Agents</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-gray-400 hover:text-white">Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-400 hover:text-white">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-white">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4 font-inter">Popular Locations</h3>
            <ul className="space-y-2 font-roboto">
              <li>
                <Link href="/communities/mumbai">
                  <a className="text-gray-400 hover:text-white">Mumbai</a>
                </Link>
              </li>
              <li>
                <Link href="/communities/delhi">
                  <a className="text-gray-400 hover:text-white">Delhi NCR</a>
                </Link>
              </li>
              <li>
                <Link href="/communities/bangalore">
                  <a className="text-gray-400 hover:text-white">Bangalore</a>
                </Link>
              </li>
              <li>
                <Link href="/communities/hyderabad">
                  <a className="text-gray-400 hover:text-white">Hyderabad</a>
                </Link>
              </li>
              <li>
                <Link href="/communities/pune">
                  <a className="text-gray-400 hover:text-white">Pune</a>
                </Link>
              </li>
              <li>
                <Link href="/communities/chennai">
                  <a className="text-gray-400 hover:text-white">Chennai</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4 font-inter">Contact Us</h3>
            <ul className="space-y-4 font-roboto">
              <li className="flex">
                <MapPin className="h-6 w-6 mr-2 text-gray-400" />
                <span>Alpha Tower, Koramangala, Bangalore 560034</span>
              </li>
              <li className="flex">
                <Phone className="h-6 w-6 mr-2 text-gray-400" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex">
                <Mail className="h-6 w-6 mr-2 text-gray-400" />
                <span>info@secondli.xyz</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-white font-medium mb-2 font-inter">Subscribe to our newsletter</h4>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-r-none text-gray-900"
                />
                <Button className="rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm font-roboto">
              &copy; {new Date().getFullYear()} Secondli.xyz. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy">
                <a className="text-gray-400 hover:text-white text-sm font-roboto">Privacy Policy</a>
              </Link>
              <Link href="/terms">
                <a className="text-gray-400 hover:text-white text-sm font-roboto">Terms of Service</a>
              </Link>
              <Link href="/cookies">
                <a className="text-gray-400 hover:text-white text-sm font-roboto">Cookie Policy</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
