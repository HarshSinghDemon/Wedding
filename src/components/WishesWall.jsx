import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';

const OperationType = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write',
};

function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  return new Error(JSON.stringify(errInfo));
}

export default function WishesWall() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorName, setAuthorName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Subscribe to real-time wishes from Firestore (capped to recent 25)
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      const wishesRef = collection(db, 'wishes');
      const q = query(wishesRef, orderBy('createdAt', 'desc'), limit(25));

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const list = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setWishes(list);
          setLoading(false);
        },
        (err) => {
          handleFirestoreError(err, OperationType.LIST, 'wishes');
          // Fallback query if ordering index is building
          const fallbackQuery = query(collection(db, 'wishes'), limit(25));
          unsubscribe = onSnapshot(fallbackQuery, (snapshot) => {
            const list = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setWishes(list);
            setLoading(false);
          }, (fallbackErr) => {
            handleFirestoreError(fallbackErr, OperationType.LIST, 'wishes');
            setLoading(false);
          });
        }
      );
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'wishes');
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  const handleAddWish = async (e) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    setSubmitting(true);
    setErrorMsg('');

    try {
      await addDoc(collection(db, 'wishes'), {
        name: authorName.trim(),
        relation: relation.trim() || 'Well-wisher',
        message: message.trim(),
        createdAt: serverTimestamp(),
      });

      setAuthorName('');
      setRelation('');
      setMessage('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);

      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#dea645', '#9e141e', '#fff9eb', '#fbe3b4'],
      });
    } catch (err) {
      const formattedError = handleFirestoreError(err, OperationType.CREATE, 'wishes');
      console.error('Failed to send wish:', formattedError);
      setErrorMsg('Could not submit wish right now. Please try again!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative w-full py-16 px-4 md:py-24 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Large Ivory Panel matching Royal Gateway Design */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-[2rem] sm:rounded-[2.5rem] border border-[#dea645]/40 bg-[#fffaf0]/95 px-4 py-8 sm:p-10 md:p-12 shadow-[0_25px_60px_-15px_rgba(158,20,30,0.18)] backdrop-blur-sm relative"
        >
          {/* Section Heading */}
          <div className="text-center mb-8">
            <p className="font-great-vibes text-3xl text-[#b16f23] md:text-4xl">
              Blessings & Best Wishes
            </p>
            <h2 className="mt-1 font-cinzel-decorative text-3xl font-bold tracking-[0.15em] text-[#9e141e] md:text-4xl">
              WISHES WALL
            </h2>
            <div className="mx-auto mt-2 h-0.5 w-24 bg-gradient-to-r from-transparent via-[#dea645] to-transparent" />
          </div>

          {/* Real-time Wishes List */}
          {loading ? (
            <div className="py-12 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#dea645] border-t-transparent" />
              <p className="mt-3 font-cormorant text-sm text-[#7a0c15]/80">
                Loading blessings from Firestore...
              </p>
            </div>
          ) : wishes.length === 0 ? (
            <div className="mb-8 rounded-2xl border border-[#dea645]/30 bg-[#fbf1e4]/60 p-8 text-center">
              <span className="text-3xl">🌸</span>
              <p className="mt-2 font-cormorant text-lg italic text-[#39150f]">
                No wishes yet. Be the very first to leave a warm blessing for Kartikey &amp; Rupshree!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
              <AnimatePresence initial={false}>
                {wishes.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="relative rounded-2xl bg-white p-5 border border-[#dea645]/20 shadow-sm text-left flex flex-col justify-between hover:border-[#dea645]/50 transition-all"
                  >
                    <p className="font-cormorant text-base text-[#39150f] leading-relaxed italic">
                      &ldquo;{item.message}&rdquo;
                    </p>
                    <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between">
                      <p className="font-cormorant text-xs font-semibold text-[#871120]">
                        — {item.name}{item.relation ? `, ${item.relation}` : ''}
                      </p>
                      <span className="text-[10px] text-[#b16f23]">🌸</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* In-page Leave a Wish Form */}
          <form onSubmit={handleAddWish} className="space-y-3.5 max-w-xl mx-auto border-t border-[#dea645]/30 pt-6">
            <h3 className="text-center font-cinzel text-sm font-bold tracking-widest text-[#7a0c15]">
              LEAVE A BLESSING FOR THE COUPLE
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                maxLength={100}
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Your Name *"
                className="w-full rounded-xl border border-[#dea645]/40 bg-white px-4 py-2.5 font-cormorant text-base text-[#39150f] shadow-sm placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#9e141e]"
              />
              <input
                type="text"
                maxLength={100}
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                placeholder="Relation (e.g. Groom's Friend)"
                className="w-full rounded-xl border border-[#dea645]/40 bg-white px-4 py-2.5 font-cormorant text-base text-[#39150f] shadow-sm placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#9e141e]"
              />
            </div>

            <div>
              <textarea
                required
                rows={3}
                maxLength={1000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your wishes & blessings here..."
                className="w-full rounded-xl border border-[#dea645]/40 bg-white px-4 py-3 font-cormorant text-base text-[#39150f] shadow-sm placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#9e141e] resize-none"
              />
            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto min-w-[220px] rounded-full bg-[#871120] hover:bg-[#9e141e] text-[#fbedd1] px-10 py-3 font-cinzel text-xs font-bold tracking-[0.15em] shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-60 cursor-pointer"
              >
                {submitting ? 'SENDING BLESSING...' : 'LEAVE A WISH'}
              </button>
            </div>

            {submitted && (
              <p className="text-center font-cormorant text-sm italic text-[#871120] pt-1">
                Thank you for your blessings! Your wish has been added live to the wall. 🌸✨
              </p>
            )}

            {errorMsg && (
              <p className="text-center font-cormorant text-sm text-red-600 pt-1">
                {errorMsg}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
