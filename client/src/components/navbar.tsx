import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-primary font-inter font-bold text-2xl cursor-pointer">
                  Secondli<span className="text-secondary">.xyz</span>
                </span>
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/">
                <a className={`${isActive("/") ? "border-b-2 border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} px-1 pt-1 font-medium font-inter`}>
                  Home
                </a>
              </Link>
              <Link href="/properties">
                <a className={`${isActive("/properties") ? "border-b-2 border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} px-1 pt-1 font-medium font-inter`}>
                  Properties
                </a>
              </Link>
              <Link href="/agents">
                <a className={`${isActive("/agents") ? "border-b-2 border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} px-1 pt-1 font-medium font-inter`}>
                  Agents
                </a>
              </Link>
              <Link href="/communities">
                <a className={`${isActive("/communities") ? "border-b-2 border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} px-1 pt-1 font-medium font-inter`}>
                  Communities
                </a>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.fullName}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <a className="cursor-pointer w-full">Dashboard</a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <a className="cursor-pointer w-full">Profile</a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth">
                  <Button variant="outline" className="mr-3">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/">
              <a
                className={`${
                  isActive("/")
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-50"
                } block pl-3 pr-4 py-2 text-base font-medium font-inter`}
              >
                Home
              </a>
            </Link>
            <Link href="/properties">
              <a
                className={`${
                  isActive("/properties")
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-50"
                } block pl-3 pr-4 py-2 text-base font-medium font-inter`}
              >
                Properties
              </a>
            </Link>
            <Link href="/agents">
              <a
                className={`${
                  isActive("/agents")
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-50"
                } block pl-3 pr-4 py-2 text-base font-medium font-inter`}
              >
                Agents
              </a>
            </Link>
            <Link href="/communities">
              <a
                className={`${
                  isActive("/communities")
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-50"
                } block pl-3 pr-4 py-2 text-base font-medium font-inter`}
              >
                Communities
              </a>
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
                      {user.fullName.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.fullName}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link href="/dashboard">
                    <a className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                      Dashboard
                    </a>
                  </Link>
                  <Link href="/profile">
                    <a className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                      Profile
                    </a>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3 space-y-1 px-2">
                <Link href="/auth">
                  <Button variant="outline" className="w-full mb-2">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
