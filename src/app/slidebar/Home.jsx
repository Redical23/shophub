"use client"
import React, { useEffect, useState } from 'react'
import SIGNOUT from '../signinout/SIGNOUT'
import Image from 'next/image'
import { Zap, Users, DollarSign, Wallet, Clock, UserCog, Search } from 'lucide-react'
import loge1 from '../IMAGES/Screenshot 2024-12-29 215027.png'
import loge2 from '../IMAGES/properaidpic.png'
import loge3 from '../IMAGES/Screenshot 2024-12-29 215214.png'
import { useRouter } from "next/navigation"
import { motion, AnimatePresence, px } from 'framer-motion'
import { useSession } from 'next-auth/react'
import ImageSlider from './IMAGESLIDER'

const Home = () => {
  
  const h1 = "/profile.png"
  const h2 = "/Benefit.png"
  const h3 = "/News.png"
  const h4 = "/Intership.png"
  const h5 = "/chat.png"
  const h6 = "/53510.jpg"
const h7 = "/h7.jpg"
const h8 = "/h8.png"
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Hire in 48 hours!",
      description: "Access a range of portfolios for your selection.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Top 3.5% talents",
      description: "A robust network of 1M+ talents who are pre-vetted.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "40% cost savings",
      description: "Save on costs for equivalent work compared to your locality.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Fair & transparent pricing",
      description: "Talents are paid competitive salaries with utmost price transparency among all three stakeholders.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Works in your local time zone",
      description: "Get talents aligned with your schedule and time zone.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <UserCog className="w-8 h-8" />,
      title: "Post-hiring support",
      description: "Payroll, IT, and admin management are all part of what we do after hiring.",
      color: "from-rose-500 to-red-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const [slides, setSlides] = useState([]);
  const router = useRouter();
  const { data: session, status } = useSession()

  const faqData = [
    {
      question: "What are the advantages of hiring remote lawyer?",
      answer: "Hiring remote laywer offers access to a global talent pool, increased flexibility, potential cost savings, and diverse perspectives. It allows client to scale quickly and efficiently without geographical constraints."
    },
    {
      question: "What kind of talent does properaid provide?",
      answer: "properaid provides a wide range of laywer, including full-stack developers, front-end and back-end specialists, mobile app developers, data scientists, AI/ML engineers, and more. All our engineers are rigorously screened for technical skills and communication abilities."
    },
    {
      question: "What other services does properaid offer?",
      answer: "In addition to individual engineer placement, Turing offers managed team solutions, project-based engagements, and consulting services. We can help with everything from augmenting your existing team to managing entire development projects."
    },
    {
      question: "Why should I choose Turing for hiring remote software talent?",
      answer: "Turing stands out due to our rigorous vetting process, vast talent pool, AI-powered matching, and ongoing support. We ensure you get the right fit for your team, both in terms of technical skills and cultural alignment, saving you time and resources in the hiring process."
    },
    {
      question: "How much time does it take to hire a remote engineer?",
      answer: "With Turing, you can typically hire a vetted remote engineer within 3-5 days. Our AI-powered platform and large pool of pre-vetted talent allow us to match you with suitable candidates quickly, significantly reducing the time-to-hire compared to traditional recruiting methods."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <div className="bg-[#00103a] text-white">
        <div className="mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <Image
                src={loge2}
                alt="LegalConnect Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="text-2xl font-bold">ProperAid</span>
            </div>
            <div className="hidden md:flex space-x-4">
              <button className="text-white hover:text-gray-300">How It Works</button>
              <button className="text-white hover:text-gray-300">Practice Areas</button>
              <button  onClick={() => router.push("/about")} className="text-white hover:text-gray-300">About Us</button>
              <button  onClick={() => router.push("/contact")} className="text-white hover:text-gray-300">Contact</button>
            </div>
            <div className="flex space-x-2">
              {status === "loading" ? (
                <p>Loading...</p>
              ) : session ? (
                <SIGNOUT />
              ) : (
                <button onClick={() => router.push("/Login")}>Login</button>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="text-4xl md:text-5xl font-bold mb-4">Find the Right Lawyer for Your Case</div>
              <div className="text-xl mb-6">Connect with experienced attorneys in various practice areas.</div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search by practice area or location"
                    className="w-full px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute right-3 top-2.5 text-gray-500" />
                </div>
                <button
                  onClick={() => router.push('/pruser/homepage')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-2 px-6 rounded-full"
                >
                  Find Lawyers
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image
                src={h8}
                alt="Lawyer consultation illustration"
                width={400}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className='contentdescription'>
        <div className='box1'>
          <div className='contentaid'>
            <div className='content1'>
              <h1>WHAT IS PROPER AID?</h1>
              <p>PROPER AID IS A SIDE With its aim of simplifying the recruitment and hiring process for any legal professional, the company enables users to browse an authentic database of lawyers; by expertise, location, and case type. Moreover, detailed lawyer profiles involve qualifications, experience, rating, and reviews. Features include direct communication options available for quick consultations via chatting, calling, or emails. The interface is easily understandable to book appointments for law experts or hire them regarding any specific legal needs as this will ensure a flawless and trustworthy user experience.</p>
            </div>
            <div className='image-box1'>
              <Image src={h7}   width={500} height={300}   className='box1image' alt="" />
            </div>
          </div>
        </div>
        <div className='box1'>
          <div className='contentaid'>
            <div className='image-box1'>
              <Image src={h6}  width={500} height={200}  className='box1image' alt="" />
            </div>
            <div className='content1'>
              <h1>HOW TO USE IT?</h1>
              <p>Visit the Homepage: Once logged in, head straight to the homepage where you'll find a curated list of lawyer profiles.
Find Your Lawyer: Browse through detailed profiles, review their specializations, ratings, and other relevant information to select the lawyer who best fits your needs.
Initiate a Chat: Click on the chosen lawyer’s profile to start a conversation directly through our built-in chat feature.
Direct Contact Option: Some lawyers also provide their phone numbers, giving you the option to call them for immediate assistance.</p>
            </div>
          </div>
        </div>
      </div>
      <div className='contenthome'>
        <div className='contentitem'>
          <h2>Features</h2>
          <div className="contentitem-item">
            <img src={h1} alt="Hire a Lawyer" />
            <div>
              <p><span>"Hire a Lawyer"</span> feature description: With its aim of simplifying the recruitment and hiring process for any legal professional, the company enables users to browse an authentic database of lawyers by expertise, location, and case type. Moreover, detailed lawyer profiles involve qualifications, experience, rating, and reviews.</p>
            </div>
          </div>
          <div className="contentitem-item">
            <img src={h5} alt="Chat" />
            <div>
              <p><span>Chat:</span> Our website aims to provide users with a convenient and reliable way to connect with lawyers. This platform helps users find the right lawyer for their legal matters and communicate with them effortlessly.</p>
            </div>
          </div>
          <div className="contentitem-item">
            <img src={h2} alt="Benefits" />
            <div>
              <p><span>Benefits:</span> Saves time and effort. Enables users to connect with lawyers from anywhere. Provides reliable and expert legal assistance. This platform offers users transparent, accessible, and secure legal services through a digital medium.</p>
            </div>
          </div>
          <div className="contentitem-item">
            <img src={h3} alt="News" />
            <div>
              <p><span>News:</span> Our website is designed to serve as a comprehensive platform for lawyers and legal professionals, providing access to all legal news and updates. Benefits: Stay informed with the latest legal news and gain quick access to critical information.</p>
            </div>
          </div>
          <div className="contentitem-item">
            <img src={h4} alt="Internship" />
            <div>
              <p><span>Internship:</span> Our website aims to provide a platform for lawyers and law students where young individuals and students can access internship opportunities. This feature is designed to promote professional growth in the legal field.</p>
            </div>
          </div>
        </div>
      </div>
      <ImageSlider />
      <div>
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-900">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-20"></div>
          </div>
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  With ProperAid, no more hiring on gut feeling or guesswork.
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
              </motion.div>
            </div>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants} className="group relative">
                  <div className="relative p-6 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
                    <div className="relative">
                      <div className={`w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${feature.color} p-3 text-white flex items-center justify-center`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
      <section className="faq-section py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#00103a' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-extrabold text-center mb-4 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-300 mb-12 text-xl">
            Unravel the mysteries of remote hiring with our FAQ
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqData.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700">
                <button className="w-full text-left p-6 focus:outline-none" onClick={() => toggleQuestion(index)} aria-expanded={activeIndex === index}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg text-gray-100">{faq.question}</span>
                    <span className="text-3xl text-blue-400 transition-transform duration-300 ease-in-out transform">
                      {activeIndex === index ? '−' : '+'}
                    </span>
                  </div>
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                      <p className="p-6 text-gray-300 bg-gray-900 border-t border-gray-700">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
