import { ChevronRight } from 'lucide-react'
import bppmic from '../assets/bppmic.png';

const Footer = () => {
  return (
    <footer className="w-full">
      <div className=" bg-slate-900">
        <div className="mx-auto pb-8 pt-12 md:mt-16 border-t flex max-w-6xl flex-col items-start space-x-8 md:flex-row">
          <div className="w-full px-6 md:w-1/2 lg:px-0">
            <h1 className="max-w-sm text-3xl text-white font-bold">
              Subscribe to our Newsletter
            </h1>
            <form
              action=""
              className="mt-4 inline-flex w-full items-center md:w-3/4"
            >
              <input
                className="flex h-10 w-full rounded-md border border-white/60 bg-transparent px-3 py-2 text-sm placeholder-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                type="email"
                placeholder="Email"
              />

              <button
                type="button"
                className="ml-4 rounded-full bg-white px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                onClick={() => alert("thank you for subscribe!")}
              >
                <ChevronRight className="h-4 w-4 text-black" />
              </button>
            </form>
            <h5 className="max-w-sm text-md py-5 text-white font-semibold">
              For General Query: bpp.headoffice@gmail.com
            </h5>
          </div>
          <div className="mt-8 grid w-4/5 gap-6 md:mt-0 lg:w-3/4 ">
            <h4 className="text-white text-3xl font-bold">Disclaimer</h4>
            <p className="mb-2 text-lg font-semibold text-white">
              Please be advised that Bharatiya Popular Party does not hold any
              official accounts on social media platforms.
            </p>
            <p className="mb-2 text-lg font-semibold text-white">
              Our organization is not present on any social media network,
              including but not limited to Facebook, Twitter, Instagram,
              LinkedIn, and others. Reporting Unauthorized Accounts
            </p>
            <p className="mb-2 text-lg font-semibold text-white">
              If you encounter any social media accounts or profiles that claim
              to represent Bhartiya Popular Party or use our name, logo, or any
              other intellectual property, please notify us immediately. These
              accounts are unauthorized and not affiliated with our
              organization. To report any such accounts, please contact us
              through email.
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="mx-auto my-6  max-w-6xl items-center justify-between px-4 md:flex lg:px-0">
        <div>
          <a
            href="/"
            className="flex gap-3 font-bold text-black-700 items-center"
          >
            <img src={bppmic} width={25} height={25} />
            <span className="poppins-regular font-black text-md lg:text-xl">
              BHARATIYA POPULAR PARTY
            </span>
          </a>
        </div>
        <div className="md:mt-0">
          <p className="text-sm font-medium text-gray-500">
            © 2024 Bharatiya Popular Party. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer