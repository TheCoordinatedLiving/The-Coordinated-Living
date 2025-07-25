"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { processTextContent } from '@/lib/textProcessing';

interface TermsWindowProps {
  onClose: () => void;
}

const TermsWindow = ({ onClose }: TermsWindowProps) => {
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      windowRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
    );
  }, []);

  const handleClose = () => {
    gsap.to(windowRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: onClose,
    });
  };

  return (
    <div ref={windowRef} className="absolute inset-x-0 top-0 bottom-16 bg-black/30 flex items-center justify-center z-50 opacity-0">
      <div className="w-[90vw] h-[90vh] max-w-[1200px] bg-white rounded-lg shadow-2xl flex flex-col">
        {/* Window Header */}
        <div className="bg-[#F1F3F4] rounded-t-lg flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-3">
            <Image src="/terms.svg" width={24} height={24} alt="Terms" />
            <h2 className="text-lg font-semibold text-gray-800">Terms & Conditions</h2>
          </div>
          <button onClick={handleClose} className="text-gray-600 hover:text-gray-800 cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden p-6">
          <div className="h-full overflow-y-auto pr-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold text-[#5C3262] mb-6">TERMS AND CONDITIONS</h1>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <section>
                  <h2 className="text-xl font-semibold text-[#5C3262] mb-3">Welcome to The Coordinated Living!</h2>
                  <p className="mb-4">
                    {processTextContent("These terms and conditions outline the rules and regulations for the use of the Website, located at https://thecoordinatedliving.com/.")}
                  </p>
                  <p className="mb-4">
                    {processTextContent("The Terms and Conditions on this webpage, as may without notice, be amended from time to time, shall apply to all our services directly or indirectly (through our authorized agents and sub-agents) made available online, any mobile device, by email or by telephone, as well as any other electronic media.")}
                  </p>
                  <p className="mb-4">
                    {processTextContent('By accessing, browsing and using our website or any of our platform (hereafter collectively referred to as the "website") and/or by completing a booking, you recognize and agree to have read, understood and agreed to the terms and conditions, including the privacy statement as set out below. You must NOT use this website if you disagree with any of the Terms and Conditions as stated below.')}
                  </p>
                  <p className="mb-4">
                    {processTextContent("The pages, content and set-up of these pages, and the services provided on these pages and through the website are owned, operated and provide by THE COORDINATE LIVING (hereinafter referred to as IKOORDINATE) and are provided for your personal, non-commercial use only, subject to the terms and conditions set out below.")}
                  </p>
                  <p className="mb-4">
                    {processTextContent('The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company\'s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client\'s needs in respect of provision of the Company\'s stated services, in accordance with and subject to, prevailing law of Ghana. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.')}
                  </p>
                  <p className="mb-4">
                    {processTextContent("IKOORDINATE reserves the right to modify all information, including Terms and Conditions, as well as all other features at any time without giving you prior notice. Your use of this website following any modifications constitutes your agreement to follow and be bound by the Terms and Conditions as modified.")}
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-[#5C3262] mb-3">Table of Contents</h2>
                  <ol className="list-decimal pl-6 mb-4 space-y-1">
                    <li> Definitions</li>
                    <li> Scope of Service</li>
                    <li> Privacy Policy</li>
                    <li> Children's Privacy</li>
                    <li> Cookies</li>
                    <li> License</li>
                    <li> Hyperlinking to our Content</li>
                    <li> Content Liability</li>
                    <li> Reservation of Rights</li>
                    <li> Prices</li>
                    <li> Payment</li>
                    <li> Correspondence and Communication</li>
                    <li> Disclaimer</li>
                    <li> Intellectual property rights</li>
                    <li> Dispute Resolution</li>
                    <li> Removal of links</li>
                  </ol>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-[#5C3262] mb-3">1. 1. DEFINITIONS</h2>
                  <p className="mb-4">
                    {processTextContent('"IKOORDINATE", "we", "us", "our", "the company" means THE COORDINATE LIVING.')}
                  </p>
                  <p className="mb-4">
                    {processTextContent('"IKOORDINATE", is the trade name for THE COORDINATE LIVING, a Sole Proprietorship registered under the laws of Ghana, and having its registered address at Number 26 Ntreh Street, Adenta- Greater Accra Region.')}
                  </p>
                  <p className="mb-4">
                    {processTextContent("The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.")}
                  </p>
                  <p className="mb-4">For the purposes of this Privacy Policy:</p>
                  <p className="mb-4">
                    {processTextContent('"Account" means a unique account created for You to access our Service or parts of our Service.')}
                  </p>
                  <p className="mb-4">
                    {processTextContent('"Affiliate" means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.')}
                  </p>
                  <p className="mb-4">
                    {processTextContent('"Company" (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Ikoordinate, Accra, Ghana.')}
                  </p>
                  <p className="mb-4">
                    {processTextContent('"Cookies" are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.')}
                  </p>
                  <p className="mb-4">
                    {processTextContent('"Country" refers to: Ghana')}
                  </p>
                  <p className="mb-4">
                    {processTextContent('"Device" means any device that can access the Service such as a computer, a cellphone or a digital tablet.')}
                  </p>
                  <p className="mb-4">
                    {processTextContent('"Personal Data" is any information that relates to an identified or identifiable individual.')}
                  </p>
                  <p className="mb-4">
                    {processTextContent('"Platform" means the (mobile) website and apps on which the Service is made available, owned, controlled, managed, maintained and/or hosted by IKOORDINATE')}
                  </p>
                  <p className="mb-4">
                    {processTextContent('"Service" means the online facility booking avenue (including the facilitation of payments) of various products and services made available by IKOORDINATE.')}
                  </p>
                  <p className="mb-4">
                    {processTextContent('"Service Provider" means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.')}
                  </p>
                  <p className="mb-4">
                    {processTextContent('"Usage Data" refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).')}
                  </p>
                  <p className="mb-4">
                    {processTextContent('"Website" refers to The Coordinated Living, accessible from https://thecoordinatedliving.com/')}
                  </p>
                  <p className="mb-4">
                    {processTextContent('"You" means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.')}
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-[#5C3262] mb-3">1. 2. SCOPE OF SERVICE</h2>
                  <p className="mb-4">
                    {processTextContent("IKOORDINATE and its agents and partners shall provide an online service through the Platform, on which visitors/individuals of the Platform and by subscribing to the website, you enter into a direct (legally binding) contractual relationship with IKOORDINATE.")}
                  </p>
                  <p className="mb-4">
                    {processTextContent("We would employ optimum use of reasonable skill and care in the provision of our service. We rely on information provided to us by other service providers in the provisions of our services. We therefore cannot guarantee that all information is accurate, complete or correct, nor can we be held liable for any such information, errors (whether patent or latent), any interruptions (whether due to any temporary and/or partial breakdown, repair, upgrade or maintenance of our Platform or otherwise).")}
                  </p>
                  <p className="mb-4">
                    {processTextContent("Our service is made available for personal and non-commercial use only. Therefore, you are not allowed to re-sell, deep-link, use, copy, monitor, display, download or reproduce any content or information, software, bookings, tickets, products or services available on our Platform for any commercial or competitive activity or purpose without our prior knowledge.")}
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-[#5C3262] mb-3">1. 3. PRIVACY POLICY</h2>
                  <p className="mb-4">
                    IKOORDINATE respects your privacy and are committed to ensuring the safety of the information you provide us. In order to constantly improve upon the services that we provide you with, we may collect and use information which you provide to us.
                  </p>
                  <p className="mb-4">
                    While using Our Service, we may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Email address</li>
                    <li>First name and last name</li>
                    <li>Phone number</li>
                    <li>Address, State, Province, ZIP/Postal code, City</li>
                    <li>Usage Data</li>
                  </ul>
                  <p className="mb-4">
                    The Company may use Personal Data for the following purposes:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>To provide and maintain our Service, including to monitor the usage of our Service.</li>
                    <li>To manage Your Account: to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</li>
                    <li>For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
                    <li>To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</li>
                    <li>To provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</li>
                    <li>To manage Your requests: To attend and manage Your requests to Us.</li>
                    <li>For business transfers: We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</li>
                    <li>For other purposes: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</li>
                  </ul>
                  <p className="mb-4">
                    We may share Your personal information in the following situations:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>With Service Providers: We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.</li>
                    <li>For business transfers: We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
                    <li>With Affiliates: We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
                    <li>With business partners: We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
                    <li>With other users: when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</li>
                    <li>With Your consent: We may disclose Your personal information for any other purpose with Your consent.</li>
                  </ul>
                  <p className="mb-4">
                    <strong>Retention of Your Personal Data</strong>
                  </p>
                  <p className="mb-4">
                    The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
                  </p>
                  <p className="mb-4">
                    The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.
                  </p>
                  <p className="mb-4">
                    <strong>Transfer of Your Personal Data</strong>
                  </p>
                  <p className="mb-4">
                    Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to and maintained on computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.
                  </p>
                  <p className="mb-4">
                    Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.
                  </p>
                  <p className="mb-4">
                    The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.
                  </p>
                  <p className="mb-4">
                    <strong>Delete Your Personal Data</strong>
                  </p>
                  <p className="mb-4">
                    You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.
                  </p>
                  <p className="mb-4">
                    Our Service may give You the ability to delete certain information about You from within the Service.
                  </p>
                  <p className="mb-4">
                    You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.
                  </p>
                  <p className="mb-4">
                    Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.
                  </p>
                  <p className="mb-4">
                    <strong>Disclosure of Your Personal Data</strong>
                  </p>
                  <p className="mb-4">
                    <strong>Business Transactions</strong>
                  </p>
                  <p className="mb-4">
                    If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
                  </p>
                  <p className="mb-4">
                    <strong>Law enforcement</strong>
                  </p>
                  <p className="mb-4">
                    Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
                  </p>
                  <p className="mb-4">
                    <strong>Other legal requirements</strong>
                  </p>
                  <p className="mb-4">
                    The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Comply with a legal obligation</li>
                    <li>Protect and defend the rights or property of the Company</li>
                    <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                    <li>Protect the personal safety of Users of the Service or the public</li>
                    <li>Protect against legal liability</li>
                  </ul>
                  <p className="mb-4">
                    <strong>Security of Your Personal Data</strong>
                  </p>
                  <p className="mb-4">
                    The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-[#5C3262] mb-3">1. 4. CHILDREN'S PRIVACY</h2>
                  <p className="mb-4">
                    Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, we take steps to remove that information from Our servers.
                  </p>
                  <p className="mb-4">
                    If we need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, we may require Your parent's consent before We collect and use that information.
                  </p>
                  <p className="mb-4">
                    We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
                  </p>
                  <p className="mb-4">
                    We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.
                  </p>
                  <p className="mb-4">
                    You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page. If you have any questions about this Privacy Policy, you can contact us:
                  </p>
                  <p className="mb-4">By email: {processTextContent("letstalk@thecoordinatedliving.com")}</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-[#5C3262] mb-3">1. 5. COOKIES</h2>
                  <p className="mb-4">
                    Cookies are used for different purposes. They allow you to be recognized as the same user across the pages of a website, between websites or in your usage of an app. The types of information that we collect through cookies include IP address; device ID; viewed pages; browser type; browsing information; operating system; internet service provider; timestamp; responses to advertisements; the referring URL; and features used or activities engaged in within the website/apps.
                  </p>
                  <p className="mb-4">
                    We employ the use of cookies. By accessing website, you agree to use cookies in agreement with the ikoordinate's Privacy Policy.
                  </p>
                  <p className="mb-4">
                    Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
                  </p>
                  <p className="mb-4">
                    Our website and apps use cookies for different purposes, these include;
                  </p>
                  <p className="mb-4">
                    <strong>Tracking Technologies and Cookies</strong>
                  </p>
                  <p className="mb-4">
                    We endeavor to offer our visitors an advanced, user-friendly website and apps that adapt automatically to their needs and wishes. To achieve this, we use technical cookies to show you our website, to track the activity on our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.
                  </p>
                  <p className="mb-4">
                    These technical cookies are absolutely necessary for our website to function properly. The technologies We use may include:
                  </p>
                  <p className="mb-4">
                    <strong>Cookies or Browser Cookies</strong>
                  </p>
                  <p className="mb-4">
                    A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, you may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.
                  </p>
                  <p className="mb-4">
                    <strong>Web Beacons.</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).
                  </p>
                  <p className="mb-4">
                    Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.
                  </p>
                  <p className="mb-4">
                    We use both Session and Persistent Cookies for the purposes set out below:
                  </p>
                  <p className="mb-4">
                    <strong>Necessary / Essential Cookies</strong>
                  </p>
                  <p className="mb-4">
                    These are session Cookies administered by Ikoordinate and these Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.
                  </p>
                  <p className="mb-4">
                    <strong>Cookies Policy / Notice Acceptance Cookies</strong>
                  </p>
                  <p className="mb-4">
                    These are Persistent Cookies that are administered by Us for the purposes of identifying if users have accepted the use of cookies on the Website.
                  </p>
                  <p className="mb-4">
                    <strong>Functionality Cookies</strong>
                  </p>
                  <p className="mb-4">
                    We also use functional cookies to remember your preferences and to help you to use our website and apps efficiently and effectively. These functional cookies are not strictly necessary for the functioning of our website or apps, but they add functionality and enhance the services we provide you with.
                  </p>
                  <p className="mb-4">
                    The purpose of these functional Cookies is to allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.
                  </p>
                  <p className="mb-4">
                    For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the cookies section of our Privacy Policy
                  </p>
                  <p className="mb-4">
                    <strong>Commercial cookies:</strong> We use third-party cookies as well as our own to display personalized advertisements on our websites and on other websites. This is called "retargeting," and it is based on browsing activities, such as the destinations you have been searching for, the product you have viewed and the prices you have been shown.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-[#5C3262] mb-3">1. 6. LICENSE</h2>
                  <p className="mb-4">
                    Unless otherwise stated ikoordinate and/or its licensors own the intellectual property rights for all material on the website. All intellectual property rights are reserved. You may access this from The Coordinated Living for your own personal use subjected to restrictions set in these terms and conditions.
                  </p>
                  <p className="mb-4">You must not:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Republish material from THE COORDINATE LIVING</li>
                    <li>Sell, rent or sub-license material from THE COORDINATE LIVING</li>
                    <li>Reproduce, duplicate or copy material from THE COORDINATE LIVING</li>
                    <li>Redistribute content from THE COORDINATE LIVING</li>
                  </ul>
                  <p className="mb-4">
                    Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. ikoordinate does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of ikoordinate, its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, ikoordinate shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
                  </p>
                  <p className="mb-4">
                    ikoordinate reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
                  </p>
                  <p className="mb-4">You warrant and represent that:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                    <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                    <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
                    <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
                  </ul>
                  <p className="mb-4">
                    You hereby grant ikoordinate a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-[#5C3262] mb-3">1. 7. HYPERLINKING TO OUR CONTENT</h2>
                  <p className="mb-4">
                    The following organizations may link to our website without prior written approval:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Government agencies;</li>
                    <li>Search engines;</li>
                    <li>News organizations;</li>
                    <li>Online directory distributors may link to our website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                    <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
                  </ul>
                  <p className="mb-4">
                    These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.
                  </p>
                  <p className="mb-4">
                    We may consider and approve other link requests from the following types of organizations:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>commonly-known consumer and/or business information sources;</li>
                    <li>dot.com community sites;</li>
                    <li>associations or other groups representing charities;</li>
                    <li>online directory distributors;</li>
                    <li>internet portals;</li>
                    <li>accounting, law and consulting firms; and</li>
                    <li>educational institutions and trade associations.</li>
                  </ul>
                  <p className="mb-4">
                    We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of ikoordinate; and (d) the link is in the context of general resource information.
                  </p>
                  <p className="mb-4">
                    These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.
                  </p>
                  <p className="mb-4">
                    {processTextContent("If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to ikoordinate. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.")}
                  </p>
                  <p className="mb-4">
                    Approved organizations may hyperlink to our website as follows:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>By use of our corporate name; or</li>
                    <li>By use of the uniform resource locator being linked to; or</li>
                    <li>By use of any other description of our website being linked to that makes sense within the context and format of content on the linking party's site.</li>
                  </ul>
                  <p className="mb-4">
                    No use of ikoordinate's logo or other artwork will be allowed for linking absent a trademark license agreement.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-[#5C3262] mb-3">1. 8. CONTENT LIABILITY</h2>
                  <p className="mb-4">
                    We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third-party rights.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-[#5C3262] mb-3">1. 9. RESERVATION OF RIGHTS</h2>
                  <p className="mb-4">
                    We reserve the right to request that you remove all links or any particular link to our website. You approve to immediately remove all links to our Website upon request. We also reserve the right to these terms and conditions and it's linking policy at any time. By continuously linking to our website, you agree to be bound to and follow these linking terms and conditions.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-[#5C3262] mb-3">1. 10. PRICES</h2>
                  <p className="mb-4">
                    The prices on our Platform are highly competitive. All our services are at a subscription fee including VAT/sales tax and all other taxes (subject to change of such taxes), unless stated otherwise on our Platforms or the confirmation email.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-[#5C3262] mb-3">1. 11. PAYMENT</h2>
                  <p className="mb-4">
                    If applicable and available, you may be required to make full or part-payment of subscription fee as required under the payment policy of website in question by means of secure online payment (all to the extent offered and supported by your bank). In some cases, mobile money payment may be allowed.
                  </p>
                  <p className="mb-4">
                    There may be instances where payment is safely processed from your credit/debit card, bank account or mobile money account to our bank account through a third-party payment processor. Any payment facilitated by us will in each case constitute a payment of (part of) the website fee price by you of the relevant product or service in final settlement of such (partial) due and payable price and you cannot reclaim such paid monies.
                  </p>
                  <p className="mb-4">
                    For certain (non-refundable) rates or special offers, please note that we may require that payment is made upfront by wire transfer (if available) or by credit card or mobile money, and therefore your credit card may be pre-authorized or charged (sometimes without any option for refund) upon paying for the site.
                  </p>
                  <p className="mb-4">
                    If you wish to review, adjust or cancel your subscription, please revert to the confirmation email and follow the instructions therein. Please note depending on the particular subscription in question, you may either be charged for your cancellation, or forfeit any prepaid amount.
                  </p>
                  <p className="mb-4">
                    If you have a late or delayed fees payment date, make sure to effectively communicate it to us to avoid cancellation of a subscription or renewal without prior notice.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-[#5C3262] mb-3">1. 12. CORRESPONDENCE AND COMMUNICATION</h2>
                  <p className="mb-4">
                    Ikoordinate shall communicate to prospective subscribers via one or more of the following means – SMS, Email, Phone Call, etc. Customers may also reach the company through our CONTACT US mediums during work hours.
                  </p>
                  <p className="mb-4">By subscribing, you agree to receive from us</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>an email, SMS, phone call or any of our communication mediums as listed above, shortly after your successful subscription providing you with certain information relevant to the website.</li>
                    <li>an email containing a receipt of your subscription fee. Please see our privacy and cookies policy for more information about how we may contact you</li>
                  </ul>
                  <p className="mb-4">
                    In order to duly complete and secure your booking, you need to use your preferred and correct email address. We are not responsible or liable for (and have no obligation to verify) any wrong or misspelled email address or inaccurate or wrong (mobile) phone number or credit card number or mobile money number.
                  </p>
                  <p className="mb-4">
                    Any claim or complaint against Ikoordinate or in respect of the service we provide must be promptly submitted via email, but in any event within thirty (30) days after the event giving rise to the complaint. Any claim or complaint that is submitted after the thirty (30) day period, may be rejected and the claimant shall forfeit its right to any damages, compensation or costs.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-[#5C3262] mb-3">1. 13. DISCLAIMER</h2>
                  <p className="mb-4">
                    To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>limit or exclude our or your liability for death or personal injury;</li>
                    <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                    <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                    <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                  </ul>
                  <p className="mb-4">
                    The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
                  </p>
                  <p className="mb-4">
                    As long as the information and services on the website are provided we will not be liable for any loss or damage of any nature.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-[#5C3262] mb-3">1. 14. INTELLECTUAL PROPERTY RIGHTS</h2>
                  <p className="mb-4">
                    Unless stated otherwise, the software required for our services or available at or used by our Website/Platform and the intellectual property rights (including the copyrights) of the contents and information of and material on our Platform are owned by Ikoordinate, its suppliers or providers.
                  </p>
                  <p className="mb-4">
                    Ikoordinate exclusively retains ownership of all rights, title and interest in and to all intellectual property rights of the Platform/website on which the service is made available. You are not entitled to copy, scrape, deep-link, etc. to publish, promote, market, integrate, use, combine or otherwise use the content or our brand without our express written permission. Any unlawful use or any of the aforementioned actions will constitute a material infringement of our intellectual property rights which will entitle us to sue.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-[#5C3262] mb-3">1. 15. GOVERNING LAW</h2>
                  <p className="mb-4">
                    To the extent permitted by law, these Terms and Conditions and the provision of our services shall be governed by and construed in accordance with the laws of the Republic of Ghana.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-[#5C3262] mb-3">1. 16. DISPUTE RESOLUTION</h2>
                  <p className="mb-4">
                    Any dispute arising out of these general terms and conditions and our services shall in the first instance be settled amicably through mediation, failing which such dispute shall be submitted to a Court of competent jurisdiction in Accra, Ghana.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-[#5C3262] mb-3">1. 17. REMOVAL OF LINKS FROM OUR WEBSITE</h2>
                  <p className="mb-4">
                    If you find any link on our website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
                  </p>
                  <p className="mb-4">
                    We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsWindow; 