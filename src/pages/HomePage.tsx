import './HomePage.scss';

function HomePage() {
  return (
    <div className="home-page">
      <section className="home-page__hero">
        <h1 className="home-page__title">Discover Your Next Manga</h1>
        <p className="home-page__subtitle">
          Explore thousands of manga series from popular genres
        </p>
      </section>

      <section className="home-page__section">
        <h2 className="home-page__section-title">Featured Manga</h2>
        <div className="home-page__placeholder">
          <p>Manga cards will be displayed here</p>
        </div>
      </section>

      <section className="home-page__section">
        <h2 className="home-page__section-title">Popular Genres</h2>
        <div className="home-page__placeholder">
          <p>Genre categories will be displayed here</p>
        </div>
      </section>

      <section className="home-page__section">
        <h2 className="home-page__section-title">Latest Updates</h2>
        <div className="home-page__placeholder">
          <p>Recently updated manga will be displayed here</p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
