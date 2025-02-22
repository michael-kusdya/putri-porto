"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  const skills = ["Motion Graphic", "Digital Ads", "Logo Animation", "Video Editing"];
  const tools = ["After Effects", "Premiere Pro", "Photoshop", "Illustrator"];

  return (
    <section className="bg-[#121212] py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start gap-12 lg:flex-row">
          <motion.div
            className="w-full lg:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="/photo/putri.jpg"
              alt="Jane Doe"
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
          </motion.div>
          <div className="w-full lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold">About Putri</h2>
              <p className="mb-6 text-gray-300">
                A highly creative and motivated Motion Graphic Designer with four years of experience in the field specializing in animation, video editing, and graphic design.
                My expertise in design software, combined with a strong sense of aesthetics, allows me to create compelling and polished work.
                With a strong foundation in motion graphics, I have worked on a variety of projects, including promotional content, branding animations, and social media visuals.
              </p>
              <p className="mb-8 text-gray-300">
                Seeking opportunities to contribute my skills and passion for visual storytelling in a dynamic and collaborative design environment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-4 text-2xl font-semibold">Skills & Tools</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Skills */}
                <div>
                  <h4 className="mb-2 text-lg font-medium">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span key={index} className="rounded-full bg-zinc-800 px-3 py-1 text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Tools */}
                <div>
                  <h4 className="mb-2 text-lg font-medium">Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool, index) => (
                      <span key={index} className="rounded-full bg-zinc-800 px-3 py-1 text-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
