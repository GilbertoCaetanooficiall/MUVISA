export default function SiteContatoPage() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-16 items-start mx-auto py-10 px-4 sm:px-6">
        <div className="flex-1 flex flex-col justify-center space-y-8 lg:sticky lg:top-24">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800/50 px-3 py-1 text-xs font-semibold text-primary dark:text-blue-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Free Consultation
            </span>
            <h1 className="text-slate-900 dark:text-white text-4xl lg:text-5xl font-black leading-tight tracking-tight drop-shadow-sm">
              Unlock Your Academic Future Today
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
              Book your free 30-minute strategy session. We&apos;ll analyze your profile and map out your journey to your dream university.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_20px_rgba(25,120,229,0.15)] group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-400 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">assignment</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Profile Evaluation</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">We analyze your background, grades, and interests to find the perfect university fit.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_20px_rgba(25,120,229,0.15)] group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-400 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">checklist</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Personalized Checklist</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Receive a custom list of every document you&apos;ll need for your application.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_20px_rgba(25,120,229,0.15)] group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-400 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Visa Timeline</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Get a clear roadmap with deadlines for your visa application process.</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 pt-4">
            <div className="flex -space-x-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Student portrait" className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbUZrUmxOtNmISLlRz7MdXzaeJg-QuC2ynRVeSSIH_Ck06ElvvEBHI2TTzND00rRsvCG_e6s4AKs9UhAU1rYdOp53JzAaOcOB7_4Te7u8Rn8eMhJI-bSgRYKd4H2IZQ9l8Y2Ix691IPwdz_eJFyb8ydotS0zxwjKmXwx_4ax-hmh0OeDSwHgSXacud7EUmNKLxqVDQ13-WxBSswGEEnjaIdfHN8v6kO5SZBsFKQmdrrFBstcNJQWqySQBtvnqlQMomX3qE8tvAqY6z" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Student portrait" className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCCQ_OKBreg1nmZkTsoTEk2sMSFO9ltriySan0HEAyt8ZAcEcKAZ_P7dV5KzjNCKB6NGdVob8nuTql53dK6uRc5uQZspeqfkbKNDSoPgvATzUCQBZvIejnaYAHzL_J2awoYeoBOX0V3mIfRe5MoMdbE7QnN3CRhHZVIFxWjQXO8FCEcsKN3f7QdwbX7crK3V6chpclezwXzT2Ae47WJU-CTIq5iPfLdjKbETrcgkLoqgaNsMYz87IrRuDSNYzyEq00v8ouPdBZnt8G" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Student portrait" className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALDDFEzt0Seur94GFLJtKfYzaNySAF3HNIJ_dFQjO0v_27eYsxZ169HlR_tRO_U6mmVMS0owGIw2QiTmOoMJqGYBRI851TFZ8ZMYDEObsIqcsxPMyYRvLQCo5cf4vtdzg8JiCvTdj1UY8AwxJRJkanEY8IjdEJE4iiBsijqMoYbL3XZs6KOj5ukuoGR3EXysyYyKLRrlYZEut1yRQEa9bOXtutTouUlBj3rzbJLKU4zxxCScFuxbyIY59luoVd1c2RFgr28iouG4XE" />
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Join <span className="text-slate-900 dark:text-white font-bold">2,000+</span> students helped this year.</p>
          </div>
        </div>

        <div className="flex-1 max-w-xl w-full mx-auto">
          <div className="bg-white dark:bg-card-dark rounded-2xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden relative">
            <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h2 className="font-bold text-slate-900 dark:text-white">Book your session</h2>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_10px_rgba(25,120,229,0.5)]">1</span>
                <span>Contact</span>
                <span className="h-px w-3 bg-slate-300 dark:bg-slate-600"></span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">2</span>
                <span>Details</span>
              </div>
            </div>

            <form className="p-6 lg:p-8 flex flex-col gap-6">
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">First Name</span>
                    <input className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary py-2.5 px-3 placeholder:text-slate-400" placeholder="Jane" type="text" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Last Name</span>
                    <input className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary py-2.5 px-3 placeholder:text-slate-400" placeholder="Doe" type="text" />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Email Address</span>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                    </div>
                    <input className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary pl-10 py-2.5 placeholder:text-slate-400" placeholder="jane@example.com" type="email" />
                  </div>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Phone Number</span>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <span className="material-symbols-outlined text-[20px]">call</span>
                    </div>
                    <input className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary pl-10 py-2.5 placeholder:text-slate-400" placeholder="+1 (555) 000-0000" type="tel" />
                  </div>
                </label>

                <div className="pt-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Intended Course of Study</span>
                    <select defaultValue="" className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary py-2.5 px-3">
                      <option disabled value="">Select your area of interest</option>
                      <option value="business">Business &amp; Management</option>
                      <option value="engineering">Engineering &amp; Technology</option>
                      <option value="arts">Arts &amp; Humanities</option>
                      <option value="science">Natural Sciences</option>
                      <option value="medicine">Medicine &amp; Health</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>

                <div className="pt-2">
                  <label className="block mb-3">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">Preferred Date &amp; Time</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">Times are displayed in your local timezone.</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary py-2.5 px-3" type="date" />
                    <select className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary py-2.5 px-3">
                      <option>09:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>02:00 PM</option>
                      <option>03:00 PM</option>
                      <option>04:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold h-12 transition-all shadow-[0_0_15px_rgba(25,120,229,0.4)] hover:shadow-[0_0_20px_rgba(25,120,229,0.6)] active:scale-[0.99]" type="button">
                  Confirm Booking
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
                <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
                  <span className="material-symbols-outlined text-sm text-green-500 dark:text-green-400">lock</span>
                  <span>Seus dados estão seguros. (Your data is safe)</span>
                </div>
              </div>
            </form>
          </div>

          <div className="lg:hidden flex items-center justify-center gap-3 mt-8">
            <div className="flex -space-x-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Student portrait" className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk5yQvZ6x43JWfoAT074kvjQs_jeCINESPoXIpM6lvYHSzKdaNpmKpAJtheaAK18t1_QGe6ob1v-d4KjEsTiXgMkwp9fTbW05Jl3mbrCocBOSVlPsmvaEhJL1c5PJctNmON6ZU_GTn7NFBW6m6Qr3mM4o_ZchmCRzjR_tGjqGWwKh4QdfNDnPInaXIWUVZhTj_m1EmGu_fAUjPGI1AP-Am6KvGXNYK0V0sTYJk3X_QVXqT9hIxdniZBdv00wnaxRxXDKeNfm59iaUg" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Student portrait" className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWKsM2IDq7BIUsDGiONN83nqx_PyyFT46Rc8qKZ7ITY2JlWSZAFj7kXFKIzgV2UFCMWf61BCdO2MzXAyoATaIphWAlYcAchSoK-SIGvT9ZzjVUHOWY95utxjz0Dwy4fXcLcF96CiO7Lr6s1mXFnBiyGn9WwNN23wHnEdT9YNeUCarjfteN_fnoIcKD_KRBtaEvR5o_NCsDejryFv3KrR_GfQTpYpNUhTzILsfZjxajnhF-4STkDeOpzpWPurSMKeSnfGazi1o5UdG2" />
            </div>
            <p className="text-xs font-medium text-slate-400">Trusted by <span className="text-white font-bold">2,000+</span> students</p>
          </div>
        </div>
      </div>
    </>
  );
}
