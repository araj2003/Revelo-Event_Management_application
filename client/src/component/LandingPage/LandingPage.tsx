import "./style.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <body className="font-popi text-sm min-w-max overflow-x-hidden">
        <header className="w-full bg-primary text-white md:pb-12 min-[1150px]:pb-24 flex flex-col items-center overflow-x-hidden">
          {/* <!-- ------------------- navbar section starts here ------------- --> */}
          <nav className=" w-full flex font-popi py-3 md:py-6 px-6 md:px-12 leading-none justify-between text-[0.9rem] font-semibold max-w-[1400px]">
            {/* <!-- navbar left section --> */}
            <div className="flex gap-6">
              <div className="flex items-center">
                <img
                  src="./assets/logo.svg"
                  alt="website logo"
                  className="h-10"
                />
              </div>
              <ul className=" hidden lg:flex gap-6">
                <li className="flex items-center">
                  <a className="flex items-center gap-1" href="#">
                    Features
                    <i className="fa-solid fa-angle-down text-[0.6rem]"></i>
                  </a>
                </li>
                <li className="flex items-center">
                  <a className="flex items-center gap-1" href="#">
                    Solutions
                    <i className="fa-solid fa-angle-down text-[0.6rem]"></i>
                  </a>
                </li>
                <li className="flex items-center">
                  <a className="hover:underline" href="#">
                    Enterprise
                  </a>
                </li>
                <li className="flex items-center">
                  <a className="flex items-center gap-1" href="#">
                    Resources
                    <i className="fa-solid fa-angle-down text-[0.6rem]"></i>
                  </a>
                </li>
                <li className="flex items-center">
                  <a className="hover:underline" href="#">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- navbar right section   --> */}
            <div className="flex items-center gap-6">
              <div className="">
                <a href="">
                  <i className="fa-solid fa-magnifying-glass text-lg"></i>
                </a>
              </div>
              <div className="">
                <a href="" className="flex items-center lg:hidden">
                  <i className="fa-solid fa-bars text-lg"></i>
                </a>
              </div>
              <a
                className="hidden lg:inline-block hover:underline"
                href="#"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Sign in
              </a>
              <button className="hidden lg:inline-block outline outline-1 hover:outline-2 transition-all  py-[0.8rem] px-4 rounded-sm">
                TALK TO SALES
              </button>
              <button className="hidden min-[1150px]:inline-block outline outline-1 outline-white hover:outline-primary  transition-all bg-white text-primary font-semibold py-[0.8rem] px-4 rounded-sm">
                TRY FOR FREE
              </button>
            </div>
          </nav>
          {/* <!------------------------- navbar section ends here ------------- --> */}

          {/* <!-- -------------------------- Hero section starts here --------------------  --> */}
          <div className="flex h-full min-[1150px]:h-[400px] md:flex-row flex-col   justify-between  pt-8 md:py-0 text-center md:text-left md:pl-12 text-lg max-w-[1400px]">
            {/* <!-- hero section left  -->/ */}
            <div className="md:w-[50%] flex px-4 md:px-0 flex-col justify-center">
              <h1 className="font-bold text-[2.5rem] md:text-5xl min-[1150px]:text-6xl font-robo leading-tight">
                Made for people.{" "}
                <span className="min-[1150px]:block text-[#ecb22e]">
                  Build for productivity.
                </span>
              </h1>
              <p className="mt-2 md:pr-10 pb-10">
                Connect the right people, find anything that you need and
                automate the rest. That’s work in Revelo, your productivity
                platform.
              </p>

              <div className="grid min-[1150px]:grid-flow-col w-full gap-4 grid-flow-row">
                <button
                  className="uppercase outline outline-1 outline-white hover:outline-primary  transition-all bg-white text-primary text-sm py-4 font-semibold rounded-sm"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign Up With Email address
                </button>
                <button className="flex items-center uppercase font-semibold p-[3px] outline outline-1 outline-blue-500 bg-blue-500 rounded-sm text-sm w-full h-[3.2rem] min-[1150px]:w-[85%]">
                  <div className="bg-white grid h-full w-12  rounded-lg place-content-center">
                    <img src="./assets/google-logo.svg" alt="" />
                  </div>
                  <p className="mx-auto">Signup with gooogle</p>
                </button>
              </div>

              <p className="mt-4">
                <span className="font-semibold">
                  Revelo is free to try for{" "}
                </span>
                as long as you like
              </p>
            </div>

            {/* <!-- hero section right  --> */}
            <div className="md:w-[50%] py-10 min-[1150px]:py-0 min-[1150px]:h-full md:p-1 md:relative md:left-6">
              <video
                autoPlay
                loop
                muted
                className="h-full md:w-screen overflow-hidden md:object-left object-cover"
                src="./assets/sample.webm"
              ></video>
            </div>
          </div>
          {/* <!-- -------------------------- Hero section starts here --------------------  --> */}
        </header>

        {/* <!-- --------------------------------------- brands section starts here ----------------------  --> */}
        <section className="bg-secondary pt-10 flex flex-col items-center text-sm font-semibold  text-center">
          <p className="mb-4">TRUSTED BY COMPANIES ALL OVER THE WORLD</p>
          <div className="flex justify-center w-[90%] max-w-[1100px] gap-6 md:gap-10 flex-wrap mt-5">
            <img
              className="h-10 md:h-12"
              src="./assets/logo-seek@2x.png"
              alt=""
            />
            <img
              className="h-10 md:h-12"
              src="./assets/logo-xero@2x.png"
              alt=""
            />
            <img className="h-10 md:h-12" src="./assets/rea@2x.png" alt="" />
            <img className="h-10 md:h-12" src="./assets/rmit@2x.png" alt="" />
            <img
              className="h-10 md:h-12"
              src="./assets/logo-ibm@2x.png"
              alt=""
            />
            <img
              className="h-10 md:h-12"
              src="./assets/deliveroo@2x.png"
              alt=""
            />
          </div>
        </section>
        {/* <!-- -------------------------------------- brands section end here ------------------------------  --> */}

        {/* <!-- ----------------------------------- features section starts here -------------------------  --> */}
        <section className="bg-secondary flex justify-center">
          <div className="py-16 flex flex-col gap-16 md:gap-20 max-w-[1400px]">
            {/* <!-- ---------------- feature one starts here ---------- --> */}
            <div className="w-full flex flex-col md:flex-row">
              <video
                autoPlay
                loop
                muted
                className="md:w-[45%] w-full pr-4 md:pr-0"
              >
                <source src="./assets/sample.webm" type="video/webm" />
              </video>

              <div className="w-full md:w-[55%] h-full p-6 pt-10 md:p-14 md:pl-20 flex flex-col justify-center gap-4">
                <h2 className="text-3xl lg:text-5xl font-semibold max-w-[33rem]">
                  Move faster with your tools in one place
                </h2>
                <p className="max-w-[28rem] text-base">
                  Automate away routine tasks with the power of generative AI
                  and simplify your workflow with all your favourite apps ready
                  to go in Revelo.
                </p>
                <a
                  href="#"
                  className="text-base max-w-[34rem] text-blue-400 hover:underline transition-all"
                >
                  Learn more about the Revelo platform{" "}
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
            {/* <!-- ---------------- feature one ends here ---------- --> */}

            {/* <!-- ---------------- feature two starts here ---------- --> */}
            <div className="w-full flex flex-col-reverse md:flex-row">
              <div className="w-full md:w-[55%] h-full p-6 pt-10 md:p-14 md:pl-20 flex flex-col justify-center gap-4">
                <h2 className="text-3xl lg:text-5xl font-semibold max-w-[33rem]">
                  Choose how you want to work
                </h2>
                <p className="max-w-[28rem] text-base">
                  In Revelo, you’ve got all the flexibility to work when, where
                  and how it’s best for you. You can easily chat, send audio and
                  video clips, or join a huddle to talk things through live.
                </p>
                <a
                  href="#"
                  className="text-base max-w-[34rem] text-blue-400 hover:underline transition-all"
                >
                  Learn more about flexible communication{" "}
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>

              <video
                autoPlay
                loop
                muted
                className="md:w-[45%] w-full pl-4 md:pl-0"
              >
                <source src="./assets/sample.webm" type="video/webm" />
              </video>
            </div>
            {/* <!-- ---------------- feature two ends here ---------- --> */}

            {/* <!-- ---------------- feature three starts here ---------- --> */}
            <div className="w-full flex flex-col md:flex-row">
              <video
                autoPlay
                loop
                muted
                className="md:w-[45%] w-full pr-4 md:pr-0"
              >
                <source src="./assets/sample.webm" type="video/webm" />
              </video>

              <div className="w-full md:w-[55%] h-full p-6 pt-10 md:p-14 md:pl-20 flex flex-col justify-center gap-4">
                <h2 className="text-3xl lg:text-5xl font-semibold max-w-[33rem]">
                  Bring your team together
                </h2>
                <p className="max-w-[28rem] text-base">
                  At the heart of Revelo are channels: organised spaces for
                  everyone and everything that you need for work. In channels,
                  it’s easier to connect across departments, offices, time zones
                  and even other companies.
                </p>
                <a
                  href="#"
                  className="text-base max-w-[34rem] text-blue-400 hover:underline transition-all"
                >
                  Learn more about channels{" "}
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
            {/* <!-- ---------------- feature three ends here ---------- --> */}
          </div>
        </section>
        {/* <!-- ----------------------------------- features section end here -------------------------  --> */}

        {/* <!-- --------------------------------- CTC section starts here -------------------------- --> */}
        <section className="flex justify-center">
          <div className="py-20 md:py-24 w-full max-w-[1400px] text-center px-6 relative">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
              Teams large and small rely on Revelo
            </h1>
            <p className="text-base mt-6">
              Revelo securely scales up to support collaboration at the world’s
              biggest companies.
            </p>
            <div className="flex flex-col md:flex-row mt-6 gap-3 justify-center">
              <button className="outline outline-1 outline-primary hover:bg-primaryDark transition-all bg-primary text-white font-semibold py-[0.9rem] px-9 rounded-sm">
                MEET SLACK FOR ENTERPRISE
              </button>
              <button className="text-primary outline outline-1 outline-primary hover:outline-2 transition-all  py-[0.9rem] px-9 font-semibold rounded-sm">
                TALK TO SALES
              </button>
            </div>
            <div className="hidden text-xl shadow-md py-1 md:text-2xl px-3 rounded-full md:inline-block absolute top-10 left-36">
              🏦11
            </div>
            <div className="hidden text-xl shadow-md py-1 md:text-2xl px-3 rounded-full md:inline-block absolute top-[50%] left-20">
              📈5
            </div>
            <div className="hidden text-xl shadow-md py-1 md:text-2xl px-3 rounded-full md:inline-block absolute bottom-10 left-44">
              🔒27
            </div>
            <div className="hidden text-xl shadow-md py-1 md:text-2xl px-3 rounded-full md:inline-block absolute right-28 top-10">
              📊12
            </div>
            <div className="hidden text-xl shadow-md py-1 md:text-2xl px-3 rounded-full md:inline-block absolute top-[50%] right-48">
              🤝9
            </div>
            <div className="hidden text-xl shadow-md py-1 md:text-2xl px-3 rounded-full md:inline-block absolute bottom-10 right-20">
              👨‍💻8
            </div>
          </div>
        </section>
        {/* <!-- --------------------------------- CTC section ends here -------------------------- --> */}

        {/* <!-- ---------------------------- stats section starts here -------------------------- --> */}
        <section className="flex justify-center">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0 md:justify-around pt-4 md:pt-8 pb-14 md:pb-16 w-full max-w-[1400px] text-center md:text-left px-6">
            <div className="p-2 w-56">
              <h1 className="text-primary text-5xl md:text-6xl lg:text-7xl font-semibold ">
                85%
              </h1>
              <p className="text-sm">
                of users say that Revelo has improved communication*
              </p>
            </div>
            <div className="p-2 w-56">
              <h1 className="text-primary text-5xl md:text-6xl lg:text-7xl font-semibold ">
                86%
              </h1>
              <p className="text-sm">
                feel that their ability to work remotely has improved*
              </p>
            </div>
            <div className="p-2 w-56">
              <h1 className="text-primary text-5xl md:text-6xl lg:text-7xl font-semibold ">
                88%
              </h1>
              <p className="text-sm">feel more connected to their teams*</p>
            </div>
          </div>
        </section>
        {/* <!-- ---------------------------- stats section ends here ---------------------------- --> */}

        {/* <!-- ------------------------ video testimonial  section starts here -------------------------  --> */}
        <section className="flex justify-center">
          <div className="flex flex-col w-full max-w-[1400px] pt-10">
            <div className="w-full flex flex-col md:flex-row gap-8">
              <div className="md:w-[52%] w-full relative group cursor-pointer flex items-center justify-center">
                <video
                  height="20px"
                  autoPlay
                  loop
                  muted
                  className="w-full rounded-e-full overflow-hidden h-56 sm:h-80 mr-4 md:mr-0 md:h-64 lg:h-80 object-cover"
                >
                  <source src="./assets/sample.webm" type="video/webm" />
                </video>
                <div className="px-9 rounded-md absolute top-[46%] right-[50%]  py-4 bg-blue-400 text-white inline-block group-hover:bg-blue-600">
                  <i className="fa-solid fa-play text-xl"></i>
                </div>
              </div>

              <div className="w-full md:w-[48%] flex flex-col justify-center p-2 px-6 md:px-0">
                <h1 className="text-2xl lg:text-3xl font-sans italic font-light">
                  ‘Many technology employees were gravitating naturally to
                  Revelo. So we followed our users to what has become one of our
                  most important tools.’
                </h1>
                <div className="mt-5">
                  <h3 className="font-semibold text-base">Matt Beal</h3>
                  <p className="font-medium">
                    Director of Technology Strategy and Architecture, Vodafone
                  </p>
                </div>
                <a
                  href="#"
                  className="text-base max-w-[34rem] mt-6 lg:mt-8  text-blue-400 hover:underline transition-all"
                >
                  See more customer stories{" "}
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>

            <p className="mt-16 mb-4 text-center text-gray-600 mx-6">
              * Weighted average. Based on 2,707 survey responses from weekly
              Revelo users in the US, UK, Australia and Canada with a ± 2%
              margin of error at 95% CI (December 2021).
            </p>
          </div>
        </section>
        {/* <!-- ------------------------ video testimonial  section ends here -------------------------  --> */}

        {/* <!-- ------------------------------- blogs section starts here ----------------------- --> */}
        <section className="flex justify-center bg-secondary py-12">
          <div className="px-6 md:px-0 max-w-[1400px]">
            <h1 className="text-2xl md:text-3xl font-semibold text-center">
              Teams large and small rely on Revelo
            </h1>
            <div className="grid grid-rows-4 md:grid-cols-2 md:grid-rows-2 lg:grid-rows-1 lg:grid-cols-4 px-6 md:px-16 py-8 gap-7">
              {/* <!-- card one  --> */}
              <div className="flex flex-col p-3 bg-white gap-8 justify-between drop-shadow-md hover:drop-shadow-xl hover:scale-105 ease-linear transition-all">
                <div>
                  <div>
                    <img
                      className="object-cover w-full"
                      src="./assets/blog.png"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <p className="text-sm text-gray-700">Event</p>
                    <h3 className="text-2xl font-semibold">
                      Ready for the future of AI in Revelo?
                    </h3>
                  </div>
                </div>
                <div className="flex items-center self-end justify-between text-sm text-blue-900 font-medium w-full">
                  <p className="">WATCH ON DEMAND</p>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </div>
              </div>

              {/* <!-- card two  --> */}
              <div className="flex flex-col p-3 bg-white gap-8 justify-between drop-shadow-md hover:drop-shadow-xl hover:scale-105 ease-linear transition-all">
                <div>
                  <div>
                    <img
                      className="object-cover w-full"
                      src="./assets/blog2.jpg"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <p className="text-sm text-gray-700">On demand</p>
                    <h3 className="text-2xl font-semibold">
                      Big things are launching. Relive the highlights of World
                      Tour New York!
                    </h3>
                  </div>
                </div>
                <div className="flex items-center self-end justify-between text-sm text-blue-900 font-medium w-full">
                  <p className="">WATCH NOW</p>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </div>
              </div>

              {/* <!-- card one  --> */}
              <div className="flex flex-col p-3 bg-white gap-8 justify-between drop-shadow-md hover:drop-shadow-xl hover:scale-105 ease-linear transition-all">
                <div>
                  <div>
                    <img
                      className="object-cover w-full"
                      src="./assets/blog3.jpg"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <p className="text-sm text-gray-700">Customer story</p>
                    <h3 className="text-2xl font-semibold">
                      How OpenAI expands ChatGPT with Revelo.
                    </h3>
                  </div>
                </div>
                <div className="flex items-center self-end justify-between text-sm text-blue-900 font-medium w-full">
                  <p className="">READ MORE</p>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </div>
              </div>

              {/* <!-- card one  --> */}
              <div className="flex flex-col p-3 bg-white gap-3 justify-between drop-shadow-md hover:drop-shadow-xl hover:scale-105 ease-linear transition-all">
                <div>
                  <div>
                    <img
                      className="object-cover w-full"
                      src="./assets/blog4.jpg"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <p className="text-sm text-gray-700">Event</p>
                    <h3 className="text-2xl font-semibold">
                      Ready for the future of AI in Revelo?
                    </h3>
                  </div>
                </div>
                <div className="flex items-center self-end justify-between text-sm text-blue-900 font-medium w-full">
                  <p className="">WATCH ON DEMAND</p>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- ------------------------------- blogs section ends here ----------------------- --> */}

        {/* <!-- --------------------------------second ctc section starts here --------------------------- --> */}
        <section className="flex justify-center text-center bg-primary py-24 text-white mb-10 overflow-hidden shape-box">
          <div className="px-6 md:px-0 w-screen max-w-[1400px]">
            <h1 className="text-3xl md:text-[2.5rem] font-semibold px-2">
              See all that you can accomplish with Revelo
            </h1>
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-12">
              <button className=" outline outline-1 outline-white hover:outline-primary  transition-all bg-white text-primary font-semibold py-4 px-12 rounded-sm">
                TRY FOR FREE
              </button>
              <button className=" outline outline-1 hover:outline-2 transition-all  py-4 px-12 rounded-sm">
                TALK TO SALES
              </button>
            </div>
          </div>
        </section>
        {/* <!-- --------------------------------second ctc section ends here --------------------------- --> */}

        {/* <!-- -----------------------------footer section starts here------------------------------  --> */}
        <footer className="flex justify-center py-12 text-sm font-medium">
          <div className="px-6 md:px-0 max-w-[1400px] w-full">
            <div className="w-full px-0 md:px-16 flex flex-col lg:flex-row gap-10">
              <div className="lg:w-[15%]">
                <img className="" src="./assets/footer-logo.svg" alt="" />
              </div>

              <div className="md:grid flex flex-col gap-10 md:grid-cols-5 md:grid-rows-1 lg:w-[85%]">
                <ul className="flex flex-col gap-5">
                  <li className="text-lg font-semibold">WHY SLACK?</li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Revelo vs email
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Channels
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Engagement
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Scale
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Watch the demo
                    </a>
                  </li>
                </ul>
                <ul className="flex flex-col gap-5">
                  <li className="text-lg font-semibold">PRODUCT</li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Features
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Channels
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Integrations
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Enterprise
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Solutions
                    </a>
                  </li>
                </ul>
                <ul className="flex flex-col gap-5">
                  <li className="text-lg font-semibold">PRICING</li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Subscriptions
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Paid vs free
                    </a>
                  </li>
                </ul>
                <ul className="flex flex-col gap-5">
                  <li className="text-lg font-semibold">RESOURCES</li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Partners
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Developers
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Community
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Apps
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Help Centre
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Events
                    </a>
                  </li>
                </ul>
                <ul className="flex flex-col gap-5">
                  <li className="text-lg font-semibold">COMPANY</li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      About us
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Leadership
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      News
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Media kit
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-blue-900" href="#">
                      Revelo shop
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        {/* <!-- -----------------------------footer section ends here------------------------------  --> */}
      </body>
    </div>
  );
};

export default LandingPage;
