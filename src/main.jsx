import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Card, Cursor, Footer, Modal, Tabs, Typewriter } from 'animal-island-ui';
import 'animal-island-ui/style';
import '../css/reset.css';
import '../css/style.css';
import { PORTFOLIO_CONTENT } from './portfolioContent.js';

// ── Scroll hook ───────────────────────────────
function useScrollProgress(slideCount) {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const handleScroll = () => {
      const mid = scroller.scrollTop + scroller.clientHeight / 2;
      let best = 0;
      for (let i = 0; i < slideCount; i++) {
        const el = document.getElementById(`slide-${i}`);
        if (el && el.offsetTop <= mid) best = i;
      }
      setActiveIndex(best);
    };

    scroller.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, [slideCount]);

  const goTo = index => {
    const el = document.getElementById(`slide-${index}`);
    if (el && scrollerRef.current) {
      scrollerRef.current.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    }
  };

  return { scrollerRef, activeIndex, goTo };
}

// ── Dots navigation ───────────────────────────
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

// ── Text helpers ──────────────────────────────
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

// ── Profile panels — Tabs + Card ─────────────
function ProfilePanels({ panels }) {
  const safePanels = panels ?? [];
  const tabs = useMemo(
    () => Array.from(new Set(safePanels.map(panel => panel.type))),
    [safePanels]
  );

  if (!safePanels.length) return null;

  const renderCards = list =>
    list.map(panel => (
      <Card
        key={`${panel.type}-${panel.title}`}
        color="default"
        style={{ textAlign: 'left' }}
      >
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
      </Card>
    ));

  if (tabs.length <= 1) {
    return (
      <div className="profile-panels">
        {renderCards(safePanels)}
      </div>
    );
  }

  const tabItems = tabs.map(tab => ({
    key: tab,
    label: tab,
    children: <div className="profile-panels">{renderCards(safePanels.filter(p => p.type === tab))}</div>,
  }));

  return (
    <div className="profile-tabs-wrapper">
      <Tabs items={tabItems} />
    </div>
  );
}

// ── Item list — Button ────────────────────────
function ItemList({ items }) {
  if (!items?.length) return null;
  return (
    <div className="item-list" aria-label="Highlights">
      {items.map(item => (
        <Button type="dashed" size="small" key={item}>{item}</Button>
      ))}
    </div>
  );
}

// ── Contact links — Button ────────────────────
function ContactLinks({ links }) {
  if (!links?.length) return null;
  return (
    <div className="contact-links" aria-label="Contact links">
      {links.map(link => (
        <Button type="link" key={link}>{link}</Button>
      ))}
    </div>
  );
}

// ── Hint reveal — Modal + Typewriter ─────────
function HintReveal({ src, text, solutionCta, solutionText, isOpen, onClose }) {
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    if (!isOpen) setShowSolution(false);
  }, [isOpen]);

  if (!text && !solutionText && !src) return null;

  return (
    <Modal
      open={isOpen}
      title="Hint"
      onClose={onClose}
      footer={null}
      typewriter={false}
    >
      <div className="hint-modal">
        {text && <p className="hint-text">{text}</p>}
        {solutionCta && !showSolution && (
          <Button
            type="default"
            size="small"
            onClick={() => setShowSolution(true)}
          >
            {solutionCta}
          </Button>
        )}
        {showSolution && solutionText && (
          <p className="solution-text">
            <Typewriter speed={60}>{solutionText}</Typewriter>
          </p>
        )}
      </div>
    </Modal>
  );
}

// ── Photo gallery ─────────────────────────────
function PhotoGallery({ photos }) {
  if (!photos?.length) return null;
  return (
    <div className="photo-gallery" aria-label="Photo gallery">
      {photos.map(photo => (
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

// ── Friend card — Card ────────────────────────
function FriendCard({ member, onClick }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <Card
      color="app-green"
      onClick={() => onClick(member)}
      style={{ cursor: 'pointer', textAlign: 'center' }}
    >
      <div className="friend-card__photo">
        {member.thumbSrc && !imgFailed ? (
          <img
            src={member.thumbSrc}
            alt={member.name || 'Person'}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="friend-card__placeholder" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="22" r="13" fill="rgba(255,255,255,0.35)" />
              <ellipse cx="32" cy="54" rx="22" ry="13" fill="rgba(255,255,255,0.25)" />
            </svg>
          </span>
        )}
      </div>
      <p className="friend-card__name">{member.name || 'Name'}</p>
    </Card>
  );
}

// ── Friend bio content (inside Modal) ─────────
function FriendBioContent({ member }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showPhoto = Boolean(member.detailSrc) && !imgFailed;

  useEffect(() => {
    setImgFailed(false);
  }, [member]);

  return (
    <div className={`friend-modal__body${showPhoto ? '' : ' friend-modal__body--no-photo'}`}>
      {member.detailSrc && (
        <div
          className="friend-modal__photo"
          style={{ display: imgFailed ? 'none' : undefined }}
        >
          <img
            src={member.detailSrc}
            alt={member.name || 'Person'}
            onError={() => setImgFailed(true)}
          />
        </div>
      )}
      <div className="friend-modal__bio">
        <h3 className="friend-modal__bio-heading">Bio</h3>
        {(member.bio ?? []).map(({ label, value }) => (
          <p key={label} className="friend-modal__bio-line">
            <strong>{label}:</strong> {value}
          </p>
        ))}
      </div>
    </div>
  );
}

// ── Friend grid — Modal ───────────────────────
function FriendGrid({ members }) {
  const [selected, setSelected] = useState(null);

  if (!members?.length) return null;

  return (
    <>
      <div className="friend-grid">
        {members.map(member => (
          <FriendCard key={member.id} member={member} onClick={setSelected} />
        ))}
      </div>
      <Modal
        open={selected !== null}
        title={selected?.name || 'Name'}
        onClose={() => setSelected(null)}
        footer={null}
        width={700}
        typewriter={false}
      >
        {selected && <FriendBioContent member={selected} />}
      </Modal>
    </>
  );
}

// ── Slide ─────────────────────────────────────
function Slide({ id, section, isHero = false, isWide = false }) {
  const [showHint, setShowHint] = useState(false);

  return (
    <section className="slide" id={id}>
      <div className={`content${isHero ? ' content--wide' : isWide ? ' content--xwide' : ''}`}>
        <p className="tag">{section.eyebrow}</p>
        {isHero ? (
          <h1 className="title">
            <Typewriter speed={55}>{section.title}</Typewriter>
          </h1>
        ) : (
          <h2 className="title">{section.title}</h2>
        )}
        <TextLines value={section.subtitle} className="sub" />
        <ProfilePanels panels={section.panels} />
        <ItemList items={section.items} />
        <ContactLinks links={section.links} />
        <PhotoGallery photos={section.photos} />
        <FriendGrid members={section.members} />
        {section.cta && (
          <Button
            type="primary"
            onClick={() => setShowHint(true)}
          >
            {section.cta}
          </Button>
        )}
        <HintReveal
          src={section.hintGifSrc}
          text={section.hintText}
          solutionCta={section.solutionCta}
          solutionText={section.solutionText}
          isOpen={showHint}
          onClose={() => setShowHint(false)}
        />
      </div>
      {section.members?.length > 0 && <Footer type="tree" />}
      {isHero && (
        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      )}
    </section>
  );
}

// ── App ───────────────────────────────────────
function App() {
  const slides = useMemo(
    () => [
      { key: 'hero', section: PORTFOLIO_CONTENT.hero, isHero: true },
      { key: 'life', section: PORTFOLIO_CONTENT.life },
      { key: 'friends', section: PORTFOLIO_CONTENT.friends, isWide: true },
    ],
    []
  );
  const { scrollerRef, activeIndex, goTo } = useScrollProgress(slides.length);

  return (
    <Cursor>
      <Dots count={slides.length} activeIndex={activeIndex} onGoTo={goTo} />
      <main id="scroller" ref={scrollerRef}>
        {slides.map((slide, index) => (
          <Slide
            id={`slide-${index}`}
            key={slide.key}
            section={slide.section}
            isHero={slide.isHero}
            isWide={slide.isWide}
          />
        ))}
      </main>
    </Cursor>
  );
}

createRoot(document.getElementById('root')).render(<App />);
