import { PageLayout } from '../components/Layout';
import cms from '../modules/cms';

// interface WorkExperienceProps {
//   dateFrom:
// }

// const WorkExperienceLine = () => (
//   <div className="row">
//     <div className="column">

//     </div>
//   </div>
// )

// const Logo = () => (
// <div />
// )

// const Project = () => (
// <div />
// )

const Work = () => (
  <PageLayout>
    <h1>Work</h1>
    <p>Experience</p>
  </PageLayout>
);

export default Work;

export const getServerSideProps = async () => {
  try {
    const { data } = await cms.request(`
        query {

          page(where: { slug: "/profile" }) {
            title
            seoDescription
            content
          }
        }
      `);

    return {
      props: data,
    };
  } catch {
    return null;
  }
};
