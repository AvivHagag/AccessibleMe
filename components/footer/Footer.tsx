export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black text-black dark:text-mint-darkest py-8">
      <div className="border-t border-primary-foreground/20 dark:border-primary-foreground/10">
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} AccessibleMe. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  );
}
