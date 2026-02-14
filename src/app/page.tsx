import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />

      {/* Content Section — cream background to test navbar scrolled state */}
      <section className="section-padding bg-cream-300">
        <div className="content-narrow text-center">
          <h2 className="font-heading text-heading-lg text-brand-navy-900">
            ליווי משפטי מקצועי
          </h2>
          <div className="accent-line my-6" />
          <p className="text-body text-brand-navy-700">
            משרד עורכי דין מיכל סיימון מתמחה בליווי עסקאות נדל&quot;ן,
            ייעוץ בתחום המקרקעין, וייצוג משפטי מקיף. אנו מציעים שירות
            אישי, מקצועי ומסור לכל לקוח ולקוחה.
          </p>
          <p className="text-body text-brand-navy-700">
            המשרד ממוקם בבית שמש ומלווה לקוחות מכל רחבי הארץ בעסקאות
            מורכבות ופשוטות כאחד, תוך מתן דגש על מקצועיות, שקיפות
            ותקשורת רציפה.
          </p>
        </div>
      </section>

      {/* Extra scroll space */}
      <section className="section-padding bg-cream-200">
        <div className="content-narrow text-center">
          <p className="text-body-sm text-brand-navy-500">
            גלול למעלה כדי לראות את המעבר של הנאבבר
          </p>
        </div>
      </section>
    </>
  );
}
