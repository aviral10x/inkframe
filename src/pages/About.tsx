import AnimatedSection from '../components/AnimatedSection';
import { auraHighlights, auraReport } from '../content/inkframe';

const productionLoop = [
  'Concept and brand read',
  'AI generation and visual testing',
  'Editing, compositing, and sound-led pacing',
  'Final assets formatted for web, social, and pitch decks',
];

export default function About() {
  return (
    <div className="container page-section">
      <AnimatedSection>
        <p className="metadata eyebrow">THE STUDIO</p>
        <h1 className="display-lg studio-title">AI VIDEO FILMS FOR BRANDS</h1>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="about-grid studio-grid">
          <div className="studio-panel">
            <p className="metadata">PRODUCTION PROMISE</p>
            <h2>Cinematic AI video, edited with a brand-first eye.</h2>
            <p>
              Strong concepts, quick turnarounds, multiple creative directions, and final assets formatted for web,
              social, and pitch decks.
            </p>
          </div>

          <div className="studio-copy">
            <p>
              InkFrame Films helps brands explore premium campaign visuals without traditional production timelines.
              The studio is built for fashion, beauty, automotive, luxury, and concept-led work where taste, speed,
              and iteration all matter.
            </p>
            <p>
              The output is not raw generation. It is directed, edited, composited, and shaped into films that can sit
              in a pitch call, a product launch, or a social feed without feeling like a tech demo.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <section className="section-band">
        <AnimatedSection>
          <p className="metadata eyebrow">HOW WE BUILD</p>
          <div className="process-grid">
            {productionLoop.map((item, index) => (
              <div key={item} className="process-step">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="section-band aura-section">
        <AnimatedSection>
          <p className="metadata eyebrow">SOCIAL CONTENT CASE STUDY</p>
          <div className="aura-grid">
            <div>
              <h2 className="section-title">Aura Kidzzz</h2>
              <p>
                InkFrame Films produced the video content for Aura Kidzzz, an Instagram-first kids and family-facing
                page built around playful short-form visuals and repeatable social content. The current performance
                report shows that the page is no longer just a style sample. It behaves like a scaled social content
                system with real audience growth, repeatable reach, and clear demographic traction.
              </p>
              <p className="aura-period">
                Reporting period: {auraReport.reportingPeriod} ({auraReport.reportingWindow})
              </p>
              <a className="btn-secondary aura-link" href="https://www.instagram.com/aurakidzzz/" target="_blank" rel="noopener noreferrer">
                View @aurakidzzz
              </a>
            </div>
            <div className="aura-facts">
              <p className="metadata">PUBLIC PROFILE SNAPSHOT</p>
              <h3>{auraReport.profileName} · {auraReport.followers} followers · {auraReport.totalPosts} posts</h3>
              <div className="aura-metrics-grid">
                <div>
                  <span className="metadata">NEW FOLLOWERS</span>
                  <strong>{auraReport.newFollowers}</strong>
                  <p>{auraReport.followerGrowth} during the reporting window</p>
                </div>
                <div>
                  <span className="metadata">TOTAL VIEWS</span>
                  <strong>{auraReport.views}</strong>
                  <p>Across the 90-day reporting period</p>
                </div>
                <div>
                  <span className="metadata">AVERAGE POST REACH</span>
                  <strong>{auraReport.averageReach}</strong>
                  <p>{auraReport.averageLikes} likes and {auraReport.averageComments} comments on average</p>
                </div>
                <div>
                  <span className="metadata">STORY PERFORMANCE</span>
                  <strong>{auraReport.storyViews}</strong>
                  <p>{auraReport.storyReach} average reach and {auraReport.storyReplies} replies</p>
                </div>
              </div>
              <ul>
                {auraHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="aura-detail-grid">
                <div>
                  <p className="metadata">TOP COUNTRIES</p>
                  <ul>
                    {auraReport.topCountries.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="metadata">CORE AGE BANDS</p>
                  <ul>
                    {auraReport.audienceAge.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="metadata">AUDIENCE GENDER</p>
                  <ul>
                    {auraReport.audienceGender.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="aura-proof">
                <p className="metadata">WHY THIS MATTERS</p>
                <ul>
                  {auraReport.topPostPerformance.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p>
                  Most active day in the report: {auraReport.mostActiveDay}. Followers-online reporting is in
                  {` ${auraReport.timezone}`}, which gives us a timing signal for release planning and content cadence.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
