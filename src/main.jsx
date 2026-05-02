import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/reset.css';
import '../css/style.css';
import { PORTFOLIO_CONTENT } from './portfolioContent.js';

function useScrollProgress(slideCount) {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const handleScroll = () => {
      const raw = scroller.scrollTop / window.innerHeight;
      setActiveIndex(Math.min(slideCount - 1, Math.max(0, Math.round(raw))));
    };

    scroller.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, [slideCount]);

  const goTo = index => {
    scrollerRef.current?.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth',
    });
  };

  return { scrollerRef, activeIndex, goTo };
}

function Dots({ count, activeIndex, onGoTo }) {
  return (
    <nav className="dots" aria-label="Section navigation">
      {Array.from({ length: count }, (_, index) => (
        <button
          className={`dot${index === activeIndex ? ' on' : ''}`}
          data-index={index}
          key={index}
          type="button"
          aria-label={`Section ${index + 1}`}
          onClick={() => onGoTo(index)}
        />
      ))}
    </nav>
  );
}

function DetailLines({ details }) {
  const lines = Array.isArray(details) ? details : [details];

  return (
    <div className="profile-card__details">
      {lines.filter(Boolean).map(line => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}

function TextLines({ value, className }) {
  const lines = Array.isArray(value) ? value : [value];

  return (
    <div className={className}>
      {lines.filter(Boolean).map(line => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}

function ProfilePanels({ panels }) {
  const safePanels = panels ?? [];
  const tabs = useMemo(
    () => Array.from(new Set(safePanels.map(panel => panel.type))),
    [safePanels]
  );
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const visiblePanels = safePanels.filter(panel => panel.type === activeTab);

  useEffect(() => {
    if (tabs.length && !tabs.includes(activeTab)) {
      setActiveTab(tabs[0]);
    }
  }, [activeTab, tabs]);

  if (!safePanels.length) return null;

  return (
    <>
      {tabs.length > 1 && (
        <div className="profile-tabs" role="tablist" aria-label="Profile categories">
          {tabs.map(tab => (
            <button
              className={`profile-tab${tab === activeTab ? ' is-active' : ''}`}
              key={tab}
              type="button"
              role="tab"
              aria-selected={tab === activeTab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
      <div className="profile-panels">
        {visiblePanels.map(panel => (
          <article className="profile-card" key={`${panel.type}-${panel.title}`}>
            <div className="profile-card__heading">
              <h2 className="profile-card__title">{panel.title}</h2>
              {panel.logoSrc && (
                <span className="profile-card__logo">
                  <img
                    src={panel.logoSrc}
                    alt=""
                    onError={event => {
                      event.currentTarget.parentElement.hidden = true;
                    }}
                  />
                </span>
              )}
            </div>
            <p className="profile-card__meta">{panel.meta}</p>
            <DetailLines details={panel.details} />
          </article>
        ))}
      </div>
    </>
  );
}

function ItemList({ items }) {
  if (!items?.length) return null;

  return (
    <ul className="item-list" aria-label="Highlights">
      {items.map(item => (
        <li className="item-pill" key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ContactLinks({ links }) {
  if (!links?.length) return null;

  return (
    <div className="contact-links" aria-label="Contact links">
      {links.map(link => (
        <a className="contact-link" href="#" key={link}>{link}</a>
      ))}
    </div>
  );
}

function HintReveal({ src, text, solutionCta, solutionText, isVisible }) {
  const [showSolution, setShowSolution] = useState(false);

  if (!src || !isVisible) return null;

  return (
    <div className="hint-reveal">
      <div className="hint-gif">
        <img
          src={src}
          alt=""
          onError={event => {
            event.currentTarget.parentElement.hidden = true;
          }}
        />
      </div>
      {text && <p className="hint-text">{text}</p>}
      {solutionCta && (
        <button
          className="btn btn--secondary"
          type="button"
          onClick={() => setShowSolution(current => !current)}
        >
          {solutionCta}
        </button>
      )}
      {showSolution && solutionText && (
        <p className="solution-text">{solutionText}</p>
      )}
    </div>
  );
}

function PhotoGallery({ photos }) {
  if (!photos?.length) return null;

  return (
    <div className="photo-gallery" aria-label="Photo gallery">
      {photos.map((photo, index) => (
        <div className="photo-slot" key={photo}>
          <img
            src={photo}
            alt=""
            onError={event => {
              event.currentTarget.parentElement.hidden = true;
            }}
          />
        </div>
      ))}
    </div>
  );
}

function Slide({ id, section, isHero = false }) {
  const [showHint, setShowHint] = useState(false);

  return (
    <section className="slide" id={id}>
      <div className={`content${isHero ? ' content--wide' : ''}`}>
        <p className="tag">{section.eyebrow}</p>
        {isHero ? (
          <h1 className="title">{section.title}</h1>
        ) : (
          <h2 className="title">{section.title}</h2>
        )}
        <TextLines value={section.subtitle} className="sub" />
        <ProfilePanels panels={section.panels} />
        <ItemList items={section.items} />
        <ContactLinks links={section.links} />
        <PhotoGallery photos={section.photos} />
        {section.cta && (
          <button
            className="btn"
            type="button"
            onClick={() => setShowHint(current => !current)}
          >
            {section.cta}
          </button>
        )}
        <HintReveal
          src={section.hintGifSrc}
          text={section.hintText}
          solutionCta={section.solutionCta}
          solutionText={section.solutionText}
          isVisible={showHint}
        />
      </div>
      {isHero && (
        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      )}
    </section>
  );
}

function App() {
  const slides = useMemo(
    () => [
      { key: 'hero', section: PORTFOLIO_CONTENT.hero, isHero: true },
      { key: 'life', section: PORTFOLIO_CONTENT.life },
      { key: 'contact', section: PORTFOLIO_CONTENT.contact },
    ],
    []
  );
  const { scrollerRef, activeIndex, goTo } = useScrollProgress(slides.length);

  return (
    <>
      <Dots count={slides.length} activeIndex={activeIndex} onGoTo={goTo} />
      <main id="scroller" ref={scrollerRef}>
        {slides.map((slide, index) => (
          <Slide
            id={`slide-${index}`}
            key={slide.key}
            section={slide.section}
            isHero={slide.isHero}
          />
        ))}
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
