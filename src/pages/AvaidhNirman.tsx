import { CheckCircle } from "lucide-react";
import React from "react";
import HomeComplaint from "../component/HomeComplaint";
import Image from "next/image";

function AvaidhNirmanPage() {
  const points = [
    "Building without proper approval from development authorities (like DDA, MCD, etc.).",
    "Building beyond the sanctioned plan or on encroached land.",
    "Commercial use in residential zones.",
    "Constructing without fire safety, parking, or environmental clearance.",
    "A rise in corruption and lawlessness",
  ];
  const collectevidence = [
    "Address of the site.",
    "Photos or videos of the ongoing construction.",
    "Name of the builder/owner (if known).",
    "Whether work is being done during restricted hours or holidays.",
  ];
  const filecomplaint = [
    "Online Complaint: Visit your local municipal corporation’s or town planning authority’s website and submit a grievance.",
    "Email or Post: Write a detailed complaint to the local Development Authority or Municipal Commissioner with photos and location details.",
    "Police & Anti-Corruption Bureau: If construction continues despite complaints, file an FIR or report to vigilance authorities.",
    "Contact Avaidh Nirman Virodhi Morcha: We provide assistance in filing complaints and ensure they are followed up properly. You can raise your concern on our website or through WhatsApp.",
  ];
   const followup = [
    "Track your complaint number.",
    "Follow up regularly with the concerned authority.",
    "Contact RTI activists or file an RTI (Right to Information) to know the action status.",
   
  ];
   const fightagain = [
    "Raise public awareness through campaigns.",
    "Provide legal consultation for victims of illegal construction.",
    "Expose builders and officials involved in unauthorized activities.",
     "Work with local media and social platforms to highlight cases.",
   
  ];

  return (
    <>
      <div>
        <div className="bg-white py-5 px-4 md:mt-8 mb-5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Column - Content */}
              <div className="space-y-6">
                {/* About Us Card */}
                <div className="bg-white rounded-2xl py-8 transform transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                      How to Stop Avaidh Nirman (Illegal Construction) and Raise
                      a Complaint
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Take Action with Us
                      </h3>
                      <p className="leading-relaxed">
                        Illegal construction, or avaidh nirman, is one of the
                        leading causes of unplanned urban development,
                        infrastructure overload, and compromised public safety.
                        Whether it’s a house built without approval, a shop
                        occupying a public footpath, or an apartment that
                        violates building norms, all of these are examples of
                        unauthorized construction that must be stopped for the
                        greater good of society.
                      </p>
                      <p className="mt-3">
                        At Avaidh Nirman Virodhi Morcha, we believe that every
                        citizen has the right and responsibility to raise their
                        voice against such activities. Here&apos;s how you can
                        identify, report, and take action against avaidh nirman
                        in your area:
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="lg:sticky lg:top-8 mx-10">
                <Image
                  width={800}
                  height={700}
                  src="/images/about-us-avaidh-nirman.webp"
                  alt="About Us"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-4 mb-15">
          <div className="bg-white px-6 lg:px-0">
            <div className="mb-5">
              <h2 className="text-2xl font-bold">
                {" "}
                Step 1: Identify Illegal Construction
              </h2>
              <p className="font-semibold mt-3">
                Illegal construction may include:
              </p>
            </div>
            <div>
              <ul className="space-y-4 text-left">
                {points.map((point, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-orange-600 w-5 h-5 mt-1" />
                    <span className="">{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Stay vigilant about sudden constructions, rapid multi-floor
                expansions, and land encroachments in your neighborhood.
              </p>
            </div>
          </div>
          <div className="bg-white px-6 lg:px-0 mt-4">
            <div>
              <div className="mb-5">
                <h2 className="text-2xl font-bold">Step 2: Collect Evidence</h2>
                <p className="font-semibold mt-3">
                  Before filing a complaint, try to gather basic information:
                </p>
              </div>
              <div>
                <ul className="space-y-4 text-left">
                  {collectevidence.map((point, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="text-orange-600 w-5 h-5 mt-1" />
                      <span className="">{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4">
                  This strengthens your complaint and provides clear proof to
                  authorities.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white px-6 lg:px-0 mt-4">
            <div>
              <div className="mb-5">
                <h2 className="text-2xl font-bold">Step 3: File a Complaint</h2>
                {/* <p className="font-semibold mt-3">
                  You can report avaidh nirman through multiple channels:
                </p> */}
              </div>
              <div>
                <ul className="space-y-4 text-left">
                  {filecomplaint.map((point, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="text-orange-600 w-5 h-5 mt-1" />
                      <span className="">{point}</span>
                    </li>
                  ))}
                </ul>
                {/* <p className="mt-4">
                  This strengthens your complaint and provides clear proof to
                  authorities.
                </p> */}
              </div>
            </div>
          </div>
           <div className="bg-white px-6 lg:px-0 mt-4">
            <div>
              <div className="mb-5">
                <h2 className="text-2xl font-bold">Step 4: Follow-Up and Legal Action</h2>
                <p className="font-semibold mt-3">
                  After filing a complaint:
                </p>
              </div>
              <div>
                <ul className="space-y-4 text-left">
                  {followup.map((point, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="text-orange-600 w-5 h-5 mt-1" />
                      <span className="">{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4">
                  If no action is taken, our Morcha will help you escalate the case to higher officials or file a Public Interest Litigation (PIL) if needed.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white px-6 lg:px-0 mt-4">
            <div>
              <div className="mb-5">
                <h2 className="text-2xl font-bold">Our Role in the Fight Against Avaidh Nirman</h2>
                <p className="font-semibold mt-3">
                  Avaidh Nirman Virodhi Morcha acts as a bridge between concerned citizens and law enforcement. We:
                </p>
              </div>
              <div>
                <ul className="space-y-4 text-left">
                  {fightagain.map((point, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="text-orange-600 w-5 h-5 mt-1" />
                      <span className="">{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4">
                  If no action is taken, our Morcha will help you escalate the case to higher officials or file a Public Interest Litigation (PIL) if needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* enquiry form */}
         <HomeComplaint/>
    </>
  );
}
 
export default AvaidhNirmanPage;
