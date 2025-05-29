import Layout from "@/modules/layouts/layout";
import MainSection from "@/modules/main/components/main.component";





export default function Home() {
  return (
    <Layout>
      <section className="text-white no-scrollbar">
        <h1>Home</h1>
      </section>
      <section className="mt-5">
        <h2 className="text-white font-semibold text-2xl">What activity does this campaign carry out?</h2>
        <div className="grid grid-cols-2 gap-3 mt-5"></div>
      </section>  
      <MainSection />
    </Layout>
  );
}