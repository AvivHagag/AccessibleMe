export default function Footer() {
  return (
    <footer className="bg-white text-black py-8">
      <div className=" border-t border-primary-foreground/20">
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} AccessibleMe. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  );
}
