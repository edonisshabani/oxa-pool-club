"use client";

import { SOFT_EASE } from "@/lib/motion";
import { PILATES_COLLAB_COPY, PILATES_EVENT_DETAILS } from "@/lib/invitations";
import type { Guest } from "@/lib/types";
import { motion } from "framer-motion";
import { OxaLogo } from "../OxaLogo";

interface PilatesInvitationCardProps {
  guest: Guest;
  animateContent?: boolean;
}

const contentVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + index * 0.08,
      duration: 0.75,
      ease: SOFT_EASE,
    },
  }),
};

export function PilatesInvitationCard({
  guest,
  animateContent = true,
}: PilatesInvitationCardProps) {
  const fullName = `${guest.firstName} ${guest.surname}`;
  const motionState = animateContent ? "visible" : "hidden";

  return (
    <motion.article
      className="relative w-full max-w-lg overflow-hidden rounded-sm bg-[#FCFAF7] shadow-2xl"
      style={{
        boxShadow:
          "0 25px 50px -12px rgba(61, 61, 61, 0.22), 0 0 0 1px rgba(143, 169, 143, 0.18)",
      }}
    >
      <div className="h-1 bg-gradient-to-r from-[#8FA98F] via-[#D4B5B0] to-[#8FA98F]" />

      <div className="px-8 py-10 text-center sm:px-10 sm:py-12">
        <motion.div custom={0} initial="hidden" animate={motionState} variants={contentVariants}>
          <OxaLogo className="mb-4" />
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8FA98F] sm:text-xs">
            {PILATES_COLLAB_COPY.partnerLabel}
          </p>
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate={motionState}
          variants={contentVariants}
          className="my-4 font-serif text-3xl text-[#3D3D3D] sm:text-4xl"
        >
          {fullName}
        </motion.h1>

        <motion.div
          custom={2}
          initial="hidden"
          animate={motionState}
          variants={contentVariants}
          className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-[#D4B5B0] to-transparent"
        />

        <motion.div
          custom={3}
          initial="hidden"
          animate={motionState}
          variants={contentVariants}
          className="space-y-5 text-left font-sans text-[#4A4A4A]"
        >
          <h2 className="text-center font-serif text-xl tracking-wide text-[#3D3D3D] sm:text-2xl">
            {PILATES_COLLAB_COPY.headline}
          </h2>

          <div className="space-y-4 rounded-sm bg-white/70 px-5 py-5 text-sm leading-relaxed sm:text-[15px]">
            {PILATES_COLLAB_COPY.paragraphs.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                custom={4 + index}
                initial="hidden"
                animate={motionState}
                variants={contentVariants}
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div custom={6} initial="hidden" animate={motionState} variants={contentVariants}>
              <p>{PILATES_COLLAB_COPY.highlightsIntro}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                {PILATES_COLLAB_COPY.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>

            <motion.p custom={7} initial="hidden" animate={motionState} variants={contentVariants}>
              {PILATES_COLLAB_COPY.closing}
            </motion.p>
          </div>

          <motion.div
            custom={8}
            initial="hidden"
            animate={motionState}
            variants={contentVariants}
            className="rounded-sm bg-[#F3EEE8] px-5 py-4 text-sm sm:text-[15px]"
          >
            <div className="space-y-1 text-[#6B625C]">
              <p>
                <span className="font-medium text-[#3D3D3D]">Date:</span> {PILATES_EVENT_DETAILS.date}
              </p>
              <p>
                <span className="font-medium text-[#3D3D3D]">Time:</span> {PILATES_EVENT_DETAILS.time}
              </p>
              <p>
                <span className="font-medium text-[#3D3D3D]">Location:</span>{" "}
                {PILATES_EVENT_DETAILS.location}
              </p>
            </div>
          </motion.div>

          <motion.p
            custom={9}
            initial="hidden"
            animate={motionState}
            variants={contentVariants}
            className="border-t border-[#E4D8D0] pt-4 text-center text-sm font-medium text-[#7A6A63]"
          >
            {PILATES_COLLAB_COPY.rsvpNote}
          </motion.p>
        </motion.div>
      </div>

      <div
        className="h-3"
        style={{
          background:
            "repeating-linear-gradient(90deg, #D4B5B0 0px, #D4B5B0 8px, #FCFAF7 8px, #FCFAF7 16px)",
        }}
      />
    </motion.article>
  );
}
