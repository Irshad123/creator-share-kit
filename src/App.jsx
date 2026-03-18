import { useMemo, useState } from 'react'

const episodes = [
  {
    id: 'ep-1',
    storyTitle: 'Dark Night Secrets',
    episodeTitle: 'Episode 1 · The Locked Door',
    listeners: '128.4K listeners',
    cover:
      'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&w=1200&q=80',
    hook: 'She opened the door… and froze.',
    caption:
      'If you love thrillers, this story will hook you from episode 1.',
    hashtags: '#Thriller #AudioDrama #BingeWorthy',
    link: 'https://your-app-link.com',
  },
  {
    id: 'ep-2',
    storyTitle: 'Dark Night Secrets',
    episodeTitle: 'Episode 2 · The Missing Tape',
    listeners: '98.2K listeners',
    cover:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    hook: 'The tape started playing on its own at 2:13 AM.',
    caption:
      'A chilling clue pulls Maya deeper into the mystery lurking behind every whisper.',
    hashtags: '#Suspense #Mystery #NightListening',
    link: 'https://your-app-link.com/episode-2',
  },
  {
    id: 'ep-3',
    storyTitle: 'Dark Night Secrets',
    episodeTitle: 'Episode 3 · Footsteps Upstairs',
    listeners: '87.9K listeners',
    cover:
      'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=1200&q=80',
    hook: 'No one else was home… so who was upstairs?',
    caption:
      'Every new episode turns the tension tighter. Start now before someone spoils the twist.',
    hashtags: '#StoryDrop #ThrillerTok #ListenNow',
    link: 'https://your-app-link.com/episode-3',
  },
]

const inputClass =
  'w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200'

function App() {
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(episodes[0].id)
  const [hook, setHook] = useState(episodes[0].hook)
  const [caption, setCaption] = useState(episodes[0].caption)
  const [feedback, setFeedback] = useState('')

  const selectedEpisode = useMemo(
    () => episodes.find((episode) => episode.id === selectedEpisodeId) ?? episodes[0],
    [selectedEpisodeId],
  )

  const shareMessage = `${hook}\n\n${caption}\n\nListen now: ${selectedEpisode.link}`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`

  const setTemporaryFeedback = (message) => {
    setFeedback(message)
    window.clearTimeout(window.__creatorShareKitFeedbackTimeout)
    window.__creatorShareKitFeedbackTimeout = window.setTimeout(() => {
      setFeedback('')
    }, 2200)
  }

  const handleEpisodeChange = (event) => {
    const nextEpisode = episodes.find((episode) => episode.id === event.target.value)
    if (!nextEpisode) return

    setSelectedEpisodeId(nextEpisode.id)
    setHook(nextEpisode.hook)
    setCaption(nextEpisode.caption)
    setFeedback('')
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage)
      setTemporaryFeedback('Copied!')
    } catch {
      setTemporaryFeedback('Clipboard unavailable')
    }
  }

  const handleInstagram = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage)
      setTemporaryFeedback('Copied for Instagram')
    } catch {
      setTemporaryFeedback('Open Instagram manually')
    } finally {
      window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer')
    }
  }

  const handleWhatsAppShare = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-8 text-zinc-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            Creator Share Kit
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Promote your story with a polished, share-ready kit.
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base">
            Edit your hook and caption, preview the post in a mobile-style card, and share it
            instantly to WhatsApp, Instagram, or your clipboard.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_1.35fr]">
          <article className="overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(24,24,27,0.08)]">
            <div className="relative h-80 w-full">
              <img
                src={selectedEpisode.cover}
                alt={selectedEpisode.storyTitle}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 text-white">
                <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                  Story card
                </span>
                <div>
                  <p className="text-sm text-zinc-200">{selectedEpisode.episodeTitle}</p>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {selectedEpisode.storyTitle}
                  </h2>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-zinc-200">{selectedEpisode.listeners}</span>
                  <button
                    type="button"
                    onClick={handleWhatsAppShare}
                    className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
                  >
                    Promote 🚀
                  </button>
                </div>
              </div>
            </div>
          </article>

          <section className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
            <article className="rounded-[2rem] bg-white p-5 shadow-[0_20px_60px_rgba(24,24,27,0.08)] sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-zinc-500">Share Kit</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
                    Build your share message
                  </h2>
                </div>
                {feedback ? (
                  <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
                    {feedback}
                  </span>
                ) : null}
              </div>

              <div className="mt-6 space-y-5">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-zinc-700">Episode</span>
                  <select
                    className={inputClass}
                    value={selectedEpisodeId}
                    onChange={handleEpisodeChange}
                  >
                    {episodes.map((episode) => (
                      <option key={episode.id} value={episode.id}>
                        {episode.episodeTitle}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-3">
                  <img
                    src={selectedEpisode.cover}
                    alt={`${selectedEpisode.storyTitle} cover`}
                    className="h-48 w-full rounded-[1.25rem] object-cover"
                  />
                </div>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-zinc-700">Hook</span>
                  <textarea
                    className={`${inputClass} min-h-28 resize-none`}
                    value={hook}
                    onChange={(event) => setHook(event.target.value)}
                    placeholder="Write a sharp opening line"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-zinc-700">Caption</span>
                  <textarea
                    className={`${inputClass} min-h-32 resize-none`}
                    value={caption}
                    onChange={(event) => setCaption(event.target.value)}
                    placeholder="Add context for your audience"
                  />
                </label>

                <div className="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Share message
                  </p>
                  <pre className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-zinc-700">
                    {shareMessage}
                  </pre>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={handleWhatsAppShare}
                    className="rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                  >
                    WhatsApp Share
                  </button>
                  <button
                    type="button"
                    onClick={handleInstagram}
                    className="rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
                  >
                    Instagram
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </article>

            <aside className="rounded-[2rem] bg-white p-5 shadow-[0_20px_60px_rgba(24,24,27,0.08)] sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-zinc-500">Preview</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
                    Mobile share card
                  </h2>
                </div>
                <div className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-500">
                  WhatsApp / Instagram style
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <div className="w-full max-w-sm rounded-[2rem] border border-zinc-200 bg-zinc-50 p-3 shadow-inner">
                  <div className="overflow-hidden rounded-[1.6rem] bg-white shadow-[0_16px_40px_rgba(24,24,27,0.1)]">
                    <img
                      src={selectedEpisode.cover}
                      alt={`${selectedEpisode.storyTitle} thumbnail`}
                      className="h-56 w-full object-cover"
                    />
                    <div className="space-y-4 p-5">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                          {selectedEpisode.storyTitle}
                        </p>
                        <p className="text-xl font-bold leading-8 text-zinc-950">{hook}</p>
                        <p className="text-sm leading-6 text-zinc-600">{caption}</p>
                      </div>

                      <p className="text-xs font-medium tracking-wide text-zinc-400">
                        {selectedEpisode.hashtags}
                      </p>

                      <button
                        type="button"
                        onClick={handleWhatsAppShare}
                        className="w-full rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                      >
                        Listen Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </section>
      </div>
    </main>
  )
}

export default App
