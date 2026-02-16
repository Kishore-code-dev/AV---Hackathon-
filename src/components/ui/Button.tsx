import * as React from "react"
import { cn } from "@/lib/utils"

// Since I didn't install class-variance-authority or radix-ui, I'll write a simpler button for now or just standard props.
// Wait, standard luxury button.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', fullWidth, ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500/50 disabled:opacity-50 disabled:cursor-not-allowed";

        const variants = {
            primary: "bg-gradient-to-r from-gold-500 to-gold-400 text-obsidian hover:from-gold-400 hover:to-gold-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]",
            secondary: "glass text-foreground hover:bg-white/10 border-white/10 hover:border-gold-500/50",
            outline: "border border-gold-500 text-gold-500 hover:bg-gold-500/10",
            ghost: "text-foreground/70 hover:text-gold-500 hover:bg-white/5"
        };

        const sizes = {
            sm: "h-9 px-4 text-sm",
            md: "h-11 px-6 text-base",
            lg: "h-14 px-8 text-lg"
        };

        return (
            <button
                ref={ref}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    fullWidth ? "w-full" : "",
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
