import { useState, useRef, useEffect } from "react";

const NAVY  = "#0D1B3E";
const TEAL  = "#1A9E8F";
const AMBER = "#F4A623";
const RUST  = "#C0392B";
const GREEN = "#1A6B3A";
const CONCRETE = "#0D1B3E"; // kept for AMBER button text
const WARM  = "#0D1B3E"; // main text on light bg

function TASSLogo({ size = "md", theme = "light" }) {
  const scales = {
    sm: { the: 9,  main: 18, sub: 16, tag: 9,  ruleW: 16, ruleH: 1.5, gap: 2 },
    md: { the: 11, main: 24, sub: 22, tag: 11, ruleW: 22, ruleH: 2,   gap: 3 },
    lg: { the: 14, main: 32, sub: 29, tag: 13, ruleW: 28, ruleH: 2,   gap: 4 },
  };
  const s = scales[size] || scales.md;
  const navy = theme === "dark" ? "#fff" : NAVY;
  const tagCol  = theme === "dark" ? "rgba(255,255,255,0.5)" : "#6B7FA3";
  const tagBold = theme === "dark" ? "rgba(255,255,255,0.75)" : "#3D4F6B";
  return (
    <div style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", gap:s.gap, userSelect:"none" }}>
      <div style={{ display:"flex", alignItems:"center", gap:7 }}>
        <div style={{ width:s.ruleW, height:s.ruleH, background:TEAL, borderRadius:99 }} />
        <span style={{ color:TEAL, fontSize:s.the, fontWeight:800, letterSpacing:"0.25em", textTransform:"uppercase", lineHeight:1 }}>THE</span>
        <div style={{ width:s.ruleW, height:s.ruleH, background:TEAL, borderRadius:99 }} />
      </div>
      <div style={{ color:navy, fontSize:s.main, fontWeight:900, letterSpacing:"-0.01em", textTransform:"uppercase", lineHeight:1, marginTop:-1 }}>APPRENTICESHIP</div>
      <div style={{ color:TEAL, fontSize:s.sub, fontWeight:900, letterSpacing:"-0.01em", textTransform:"uppercase", lineHeight:1, marginTop:-3 }}>SUCCESS SYSTEM™</div>
      <div style={{ width:"70%", height:s.ruleH, background:TEAL, borderRadius:99 }} />
      <div style={{ color:tagCol, fontSize:s.tag, letterSpacing:"0.16em", textTransform:"uppercase", fontWeight:400, marginTop:1 }}>
        Stop Guessing.{" "}<strong style={{ fontWeight:800, color:tagBold }}>Start Securing.</strong>
      </div>
    </div>
  );
}

const MODULES = [
  { id: "home",       icon: "🏗️",  label: "Home" },
  { id: "sector",     icon: "🔍",  label: "Sector" },
  { id: "pathways",   icon: "📋",  label: "Pathways" },
  { id: "apply",      icon: "📝",  label: "Apply" },
  { id: "cv",         icon: "📄",  label: "CV" },
  { id: "star",       icon: "⭐",  label: "STAR" },
  { id: "interview",  icon: "🎤",  label: "Interview" },
  { id: "technical",  icon: "🔧",  label: "Technical" },
  { id: "citb",       icon: "🦺",  label: "CITB" },
  { id: "casestudies",icon: "📚",  label: "Stories" },
  { id: "roadmap",    icon: "🗓️",  label: "Roadmap" },
  { id: "edi",        icon: "🤝",  label: "EDI" },
  { id: "coach",      icon: "🤖",  label: "Coach" },
];

const TRADES = [
  { id: "carpentry",   label: "Carpentry & Joinery",     icon: "🪚" },
  { id: "bricklaying", label: "Bricklaying & Masonry",   icon: "🧱" },
  { id: "plumbing",    label: "Plumbing & Heating",      icon: "🔧" },
  { id: "electrical",  label: "Electrical Installation",  icon: "⚡" },
  { id: "plastering",  label: "Plastering & Dry Lining",  icon: "🏠" },
  { id: "painting",    label: "Painting & Decorating",   icon: "🖌️" },
  { id: "roofing",     label: "Roofing",                 icon: "🏚️" },
  { id: "plant",       label: "Plant Operations",        icon: "🚜" },
];

const TECHNICAL_QS = {
  carpentry: [
    { q: "What is a plumb line used for?", a: "To check vertical alignment.", opts: ["To measure horizontal distances", "To check vertical alignment", "To mark out angles", "To test moisture in timber"], why: "A plumb line uses gravity to establish a true vertical — fundamental for door frames, wall studs and structural work." },
    { q: "What does a mitre saw do?", a: "Cuts timber at precise angles, commonly 45°.", opts: ["Cuts timber lengthwise", "Cuts timber at precise angles, commonly 45°", "Joins two pieces of timber", "Removes nails from timber"], why: "Mitre saws are essential for skirting boards, door frames and cornice work where angled joints must fit perfectly." },
    { q: "What is a mortise and tenon joint?", a: "A projecting piece (tenon) fitting into a hole (mortise) in another piece.", opts: ["Two pieces glued face-to-face", "A projecting piece (tenon) fitting into a hole (mortise) in another piece", "Two pieces joined at 45 degrees", "A metal fastener joining two beams"], why: "One of the strongest traditional woodworking joints — used in door frames, staircases and structural framing for centuries." },
    { q: "Why is timber graded before use?", a: "To classify its strength and suitability for structural or cosmetic purposes.", opts: ["To determine its price", "To classify its strength and suitability for structural or cosmetic purposes", "To check its moisture content only", "To measure its length"], why: "Using the wrong grade in a structural application can be dangerous. Grading ensures the right timber is used in the right place." },
    { q: "What PPE is essential when using a circular saw?", a: "Safety glasses, ear protection and steel-capped boots.", opts: ["Gloves and a high-vis vest only", "Safety glasses, ear protection and steel-capped boots", "Hard hat and knee pads only", "Dust mask only"], why: "Circular saws produce flying debris, significant noise, and foot-crush risk. All three PPE items address real hazards." },
  ],
  bricklaying: [
    { q: "What is mortar made of?", a: "Sand, cement, lime and water.", opts: ["Sand and water only", "Sand, cement, lime and water", "Concrete and aggregate", "Gypsum and water"], why: "The correct mix is critical — too weak and the wall will fail; too strong and it may crack as it cannot flex with movement." },
    { q: "How many standard bricks per square metre of wall (single skin)?", a: "Approximately 60 bricks.", opts: ["Around 30", "Approximately 60 bricks", "Around 90", "Around 120"], why: "Knowing quantities prevents over- or under-ordering materials — a key practical skill on any site." },
    { q: "What is a header course in brickwork?", a: "A course of bricks laid with their ends facing outward, perpendicular to the wall face.", opts: ["A course of bricks laid flat on their side", "A course of bricks laid with their ends facing outward, perpendicular to the wall face", "The first course on a foundation", "A decorative top course"], why: "Header courses bind the two leaves of a cavity wall together and are a key part of traditional English and Flemish bond patterns." },
    { q: "What is the purpose of a DPC (damp proof course)?", a: "To prevent rising damp from the ground entering the walls.", opts: ["To strengthen the foundation", "To prevent rising damp from the ground entering the walls", "To allow the wall to breathe", "To support the first course of bricks"], why: "Without a DPC, moisture wicks up through masonry causing structural damage and health hazards. It is a building regulation requirement." },
    { q: "What safety gear do bricklayers always need?", a: "Gloves, safety glasses, steel-capped boots and dust mask.", opts: ["Hard hat and hi-vis only", "Gloves, safety glasses, steel-capped boots and dust mask", "Knee pads only", "Ear defenders and gloves only"], why: "Brick dust contains silica — a serious lung hazard. Gloves protect from cement burns. Eyes and feet face multiple hazards." },
  ],
  plumbing: [
    { q: "What is the purpose of a U-bend under a sink?", a: "To hold water that blocks sewer gases from entering the building.", opts: ["To slow water flow to the drain", "To hold water that blocks sewer gases from entering the building", "To filter debris from waste water", "To allow easy access for cleaning"], why: "The water trap is a fundamental safety feature in all waste systems — without it, toxic and flammable gases can enter occupied spaces." },
    { q: "What does SNIPEF stand for?", a: "Scottish and Northern Ireland Plumbing Employers Federation.", opts: ["Scottish National Institute of Plumbing Engineering Faculty", "Scottish and Northern Ireland Plumbing Employers Federation", "Standard National Industrial Plumbing Education Framework", "Scottish Network for Integrated Plumbing and Engineering Firms"], why: "SNIPEF manages the plumbing apprenticeship framework in Scotland — knowing this shows sector awareness." },
    { q: "What is the correct procedure before working on any pipe?", a: "Isolate the water supply and confirm pressure is zero before cutting or joining.", opts: ["Check the water is cold", "Isolate the water supply and confirm pressure is zero before cutting or joining", "Wrap the pipe in tape", "Inform the customer"], why: "Working on live pressurised pipes causes floods, injury and property damage. Isolation and verification is non-negotiable." },
    { q: "How long does the Scottish plumbing Modern Apprenticeship take?", a: "4 years, leading to SVQ Level 3.", opts: ["1 year", "2 years", "3 years", "4 years, leading to SVQ Level 3"], why: "Plumbing is one of the longer apprenticeships — the qualification is rigorous and reflects the complexity of the trade." },
    { q: "What is a stopcock?", a: "A valve that controls the flow of water to part or all of a building's supply.", opts: ["A pressure gauge", "A valve that controls the flow of water to part or all of a building's supply", "A type of pipe fitting", "A water meter"], why: "Knowing where stopcocks are located is critical in emergencies — you need to be able to isolate water quickly." },
  ],
  electrical: [
    { q: "What colour is the Live wire in standard UK wiring?", a: "Brown.", opts: ["Red", "Blue", "Brown", "Green and yellow"], why: "The UK changed from red/black to brown/blue/green-yellow in 2006. Knowing both old and new codes is important when working in older buildings." },
    { q: "What is earthing?", a: "Connecting electrical equipment to the ground so fault current flows safely to earth.", opts: ["Connecting equipment to the neutral wire", "Connecting electrical equipment to the ground so fault current flows safely to earth", "Insulating cables from moisture", "Reducing voltage in a circuit"], why: "Earthing prevents electric shock — if a fault occurs, current flows to earth rather than through a person touching the equipment." },
    { q: "What is a residual current device (RCD)?", a: "A safety device that cuts power instantly if it detects current leaking to earth.", opts: ["A device that limits maximum current draw", "A safety device that cuts power instantly if it detects current leaking to earth", "A meter measuring electricity consumption", "A fuse for high-voltage circuits"], why: "RCDs react in milliseconds — fast enough to prevent electrocution. They are required on circuits in bathrooms and outdoors." },
    { q: "What does SELECT represent in Scotland?", a: "The trade association for the electrical contracting industry in Scotland.", opts: ["A government safety certification scheme", "The trade association for the electrical contracting industry in Scotland", "A type of electrical test instrument", "The Scottish equivalent of CITB"], why: "SELECT, like SNIPEF for plumbing, is key to the electrical apprenticeship framework in Scotland." },
    { q: "What should you do before working on any electrical circuit?", a: "Isolate the circuit, lock off, and test with a voltage tester to confirm it is dead.", opts: ["Switch off at the socket", "Isolate the circuit, lock off, and test with a voltage tester to confirm it is dead", "Wear rubber gloves only", "Ask a colleague to watch"], why: "Live working is extremely dangerous. The isolate, lock off, test procedure is industry standard and a legal requirement." },
  ],
  plastering: [
    { q: "What is the difference between plastering and dry lining?", a: "Plastering applies wet plaster to walls; dry lining fixes pre-made plasterboard without wet plaster.", opts: ["There is no difference", "Plastering applies wet plaster to walls; dry lining fixes pre-made plasterboard without wet plaster", "Dry lining is for ceilings only", "Plastering is quicker than dry lining"], why: "Both achieve smooth walls but through different methods — dry lining is faster for new builds while plastering is often used in renovation." },
    { q: "Why must walls be primed before plastering?", a: "To seal the surface and ensure even suction so the plaster bonds properly.", opts: ["To make the wall waterproof", "To seal the surface and ensure even suction so the plaster bonds properly", "To add strength to the wall", "To prevent cracking in cold weather"], why: "Without primer, plaster can dry too quickly in some areas, causing uneven finish, cracking or delamination." },
    { q: "What is a hawk used for in plastering?", a: "A flat board held in one hand to carry plaster while it is applied with the other.", opts: ["To smooth the finished surface", "A flat board held in one hand to carry plaster while it is applied with the other", "To mix the plaster", "To measure the thickness of plaster"], why: "The hawk is one of the plasterer's most fundamental tools — mastering it is one of the first practical skills an apprentice learns." },
    { q: "What are the two main coats in traditional two-coat plastering?", a: "The scratch coat (undercoat) and the finish coat.", opts: ["The primer coat and the top coat", "The scratch coat (undercoat) and the finish coat", "The bonding coat and the seal coat", "The base coat and the colour coat"], why: "The scratch coat builds up the base and is deliberately roughened; the finish coat provides the smooth final surface." },
    { q: "What PPE is essential when mixing and applying plaster?", a: "Safety glasses, FFP2 dust mask and gloves.", opts: ["Hard hat and hi-vis only", "Safety glasses, FFP2 dust mask and gloves", "Ear defenders only", "Steel-capped boots only"], why: "Wet plaster is highly alkaline and causes chemical burns. Plaster dust is a respiratory hazard. Both require protection." },
  ],
  painting: [
    { q: "How do you prepare a wall correctly before painting?", a: "Sand, clean, fill cracks, allow to dry, then apply primer.", opts: ["Apply paint directly", "Sand, clean, fill cracks, allow to dry, then apply primer", "Apply two coats without preparation", "Use masking tape and paint immediately"], why: "Paint adhesion depends entirely on surface preparation. Skipping prep leads to peeling, bubbling and an uneven finish." },
    { q: "What is the difference between matte and gloss paint?", a: "Matte is flat and non-reflective; gloss is shiny, harder-wearing and easier to clean.", opts: ["Matte dries faster than gloss", "Matte is flat and non-reflective; gloss is shiny, harder-wearing and easier to clean", "They are the same but different colours", "Gloss is for walls and matte for woodwork only"], why: "Choosing the right sheen for the context — walls vs trim, bathroom vs bedroom — is a key professional decision." },
    { q: "What is the cutting in technique?", a: "Painting a precise edge where wall meets ceiling or woodwork, using a brush before rolling.", opts: ["Using a roller near edges", "Painting a precise edge where wall meets ceiling or woodwork, using a brush before rolling", "Applying a second coat immediately", "Mixing two paint colours together"], why: "Clean lines define the quality of a paint job. Cutting in before rolling prevents roller marks on adjacent surfaces." },
    { q: "Why should you thin paint before spraying?", a: "Spray equipment requires lower viscosity for consistent atomisation — unthinned paint clogs the gun.", opts: ["To make it cheaper", "Spray equipment requires lower viscosity for consistent atomisation — unthinned paint clogs the gun", "To make it dry faster", "To change the colour slightly"], why: "Using paint at the wrong viscosity in a spray system causes spitting, uneven coverage and equipment damage." },
    { q: "What COSHH precautions apply when using solvent-based paints?", a: "Ensure good ventilation, wear a respirator and keep away from ignition sources.", opts: ["Just open a window", "Ensure good ventilation, wear a respirator and keep away from ignition sources", "Wear gloves only", "No precautions needed for paint"], why: "Solvent vapours are flammable and toxic — they can cause serious health effects and create fire risk in enclosed spaces." },
  ],
  roofing: [
    { q: "How should roof slates overlap?", a: "Each slate overlaps the one below by at least two-thirds of its length.", opts: ["By half the slate length", "Each slate overlaps the one below by at least two-thirds of its length", "By one quarter only", "No overlap is needed with modern slates"], why: "Insufficient overlap allows water to penetrate under slates during wind-driven rain — the primary cause of roof leaks." },
    { q: "What is a ridge tile?", a: "A curved or angled tile capping the apex of a roof where two slopes meet.", opts: ["A flat tile used on the main slope", "A curved or angled tile capping the apex of a roof where two slopes meet", "A gutter tile at the eave", "A decorative tile along the bottom edge"], why: "Ridge tiles protect the most vulnerable point of the roof — the apex — from water ingress and structural movement." },
    { q: "What is the most critical PPE for roofers working at height?", a: "Safety harness, non-slip boots and hard hat.", opts: ["Gloves and hi-vis only", "Safety harness, non-slip boots and hard hat", "Ear defenders and glasses only", "A dust mask only"], why: "Falls from height are the leading cause of death in construction. Working at height without a harness is a legal offence." },
    { q: "What is flashing used for on a roof?", a: "Waterproof material used to seal joints between the roof and walls, chimneys or pipes.", opts: ["To strengthen the ridge line", "Waterproof material used to seal joints between the roof and walls, chimneys or pipes", "To weight down loose slates", "To insulate the roof space"], why: "Flashing failure is the most common cause of roof leaks — correctly fitted and sealed flashing is a core roofing competency." },
    { q: "What regulations govern work at height in the UK?", a: "The Work at Height Regulations 2005.", opts: ["The Construction Act 1996", "The Work at Height Regulations 2005", "The Health and Safety at Work Act 1974 only", "The PPE at Work Regulations 1992"], why: "These regulations require proper planning, supervision and use of appropriate equipment for all work where a fall could cause injury." },
  ],
  plant: [
    { q: "What does a CPCS card prove?", a: "That the holder is competent to operate a specific category of plant machinery.", opts: ["That the holder owns the machine", "That the holder is competent to operate a specific category of plant machinery", "That the machine has passed inspection", "That the holder has a driving licence"], why: "CPCS is the industry standard — operating plant without the relevant card is illegal on most sites." },
    { q: "How do you stay safe around operating excavators?", a: "Stay visible, use hand signals, wear hi-vis and never stand in the swing zone.", opts: ["Stand behind the machine", "Stay visible, use hand signals, wear hi-vis and never stand in the swing zone", "Only approach when the engine is running", "No special precautions needed"], why: "Excavators have large blind spots and their swing radius can extend several metres — being struck by the arm is a frequent site fatality." },
    { q: "What is a pre-start check?", a: "A visual and functional inspection of a machine before operation to identify defects or hazards.", opts: ["A check of fuel levels only", "A visual and functional inspection of a machine before operation to identify defects or hazards", "A government certificate check", "A check done by the site manager, not the operator"], why: "Pre-start checks are a legal requirement and the operator's first line of defence against equipment failure during use." },
    { q: "What is a lift plan?", a: "A document detailing how a crane or lifting operation will be carried out safely.", opts: ["A plan showing where lifts are located in a building", "A document detailing how a crane or lifting operation will be carried out safely", "A certificate of crane ownership", "A diagram of ground conditions only"], why: "Crane and lifting operations have complex load, ground bearing and weather variables — a lift plan coordinates all these safely." },
    { q: "When must you stop operating plant?", a: "If the machine develops a fault, conditions become unsafe, or you are instructed to stop.", opts: ["Only when told to by the site manager", "If the machine develops a fault, conditions become unsafe, or you are instructed to stop", "At the end of the working day only", "When fuel runs low"], why: "Plant operators must exercise independent judgement on safety — a fault not reported is a risk to everyone on site." },
  ],
};

const CITB_QUESTIONS = [
  { q: "You notice a colleague not wearing their hard hat on site. What should you do?", opts: ["Ignore it — not your responsibility", "Wait until end of shift and mention it", "Remind them immediately and report to supervisor if they refuse", "Contact the HSE straight away"], correct: 2, explain: "Immediate action is required. Hard hats protect against life-threatening head injuries. Remind first, escalate if ignored. You do not contact the HSE for day-to-day site safety issues." },
  { q: "Which of the following is NOT a valid method of controlling COSHH hazards?", opts: ["Substituting the hazardous substance with a safer one", "Using personal protective equipment", "Ignoring the COSHH data sheet", "Engineering controls such as ventilation"], correct: 2, explain: "Ignoring the COSHH data sheet is never acceptable. COSHH controls follow a hierarchy: eliminate, substitute, engineer, administer, then PPE." },
  { q: "What score is required to pass the CITB Health, Safety and Environment test?", opts: ["80% (40/50)", "85% (43/50)", "90% (45/50)", "95% (48/50)"], correct: 2, explain: "You must score 45 out of 50 (90%) to pass. This high pass mark reflects how seriously the industry takes health and safety knowledge." },
  { q: "You discover a potentially unsafe piece of equipment on site. What is the correct action?", opts: ["Continue using it carefully", "Tag it as unsafe, take it out of service, and report to your supervisor", "Ask a colleague to check it before using", "Use it only for small tasks"], correct: 1, explain: "Unsafe equipment must be taken out of service immediately and tagged. Using it — even carefully — endangers you and others." },
  { q: "What does a YELLOW triangular sign on a construction site indicate?", opts: ["Prohibition — do not do this", "Warning — be aware of a hazard", "Mandatory — you must do this", "Safe condition — first aid or escape route"], correct: 1, explain: "Yellow triangular signs are warning signs indicating a potential hazard nearby. Blue round signs are mandatory. Red crossed signs are prohibition. Green signs indicate safe conditions." },
  { q: "Which legislation places a legal duty on employees to take care of their own health and safety?", opts: ["The Construction (Design and Management) Regulations 2015", "The Health and Safety at Work Act 1974", "The Work at Height Regulations 2005", "The Manual Handling Operations Regulations 1992"], correct: 1, explain: "Section 7 of the Health and Safety at Work Act 1974 places a legal duty on every employee — not just employers — to take reasonable care of their own and others' safety." },
  { q: "What is the legal maximum weight a person may lift manually without a risk assessment?", opts: ["10kg always", "No specific legal limit — it depends on the task and individual", "25kg always safe", "50kg with two people"], correct: 1, explain: "There is no single safe weight limit in law. The Manual Handling Regulations require a risk assessment considering the task, load, environment and individual capability." },
  { q: "You are about to use a power tool and notice the cable is damaged. What should you do?", opts: ["Use it carefully, avoiding the damaged section", "Wrap the damaged area with tape and use it", "Take it out of service, label it damaged, and report it", "Use it only briefly to finish the current task"], correct: 2, explain: "A damaged cable is a serious electrical hazard. No improvised repair is acceptable — the tool must be taken out of service immediately." },
  { q: "What is a Toolbox Talk?", opts: ["A briefing about the tools required for a task", "A short informal safety briefing given to workers on a specific hazard or task", "A formal training course on tool use", "A documented inspection of all tools on site"], correct: 1, explain: "Toolbox Talks are brief, focused safety briefings — usually 5 to 15 minutes — addressing a specific hazard or task. They are a key part of site safety culture." },
  { q: "Under RIDDOR, which of the following must be reported to the HSE?", opts: ["A minor cut requiring a plaster", "An employee absent for 7 or more consecutive days due to a work-related injury", "A near miss with no injury", "A broken tool"], correct: 1, explain: "RIDDOR requires reporting of injuries causing 7 or more days absence, deaths, specified injuries (fractures, amputations etc.) and certain dangerous occurrences. Minor cuts and near misses are recorded in the site accident book but not reported to the HSE." },
  { q: "What colour is a first aid sign?", opts: ["Red with white text", "Green with white symbol", "Blue with white symbol", "Yellow with black symbol"], correct: 1, explain: "First aid and emergency signs are green — indicating a safe condition. Red is prohibition, blue is mandatory, yellow is warning." },
  { q: "What does CDM stand for in construction?", opts: ["Construction Design and Manufacture", "Construction (Design and Management) Regulations", "Certified Demolition Management", "Civil Design and Materials"], correct: 1, explain: "CDM Regulations 2015 set out duties for planning, managing and monitoring safety throughout construction projects from design to completion." },
];

const STAR_EXAMPLES = [
  {
    label: "Teamwork",
    question: "Describe a time you worked effectively as part of a team.",
    weak: "I work well in teams. I usually do my share and help people out when needed. I was on a sports team once.",
    good: "In my school woodwork class, our group had to build a small bench together. I took responsibility for cutting the timber while others focused on assembly. We finished on time and the bench was displayed at the school fair.",
    strong: "In my school technology project, our team of four had to design and build a garden planter within two weeks. I took on the role of project coordinator — I drew up a simple plan, divided tasks so each person played to their strengths, and set daily check-in points so we could catch problems early. When one team member fell behind on the joinery section, I spent two evenings after school helping them catch up. We submitted on time and our planter won the category prize. What I realised is that effective teamwork means taking ownership of the outcome — not just your own part.",
    why: "The strong answer gives a specific role, shows initiative when a problem arose, uses 'I' throughout, ends with a tangible outcome and a genuine reflection. It reads like a real experience, not a rehearsed claim."
  },
  {
    label: "Problem solving",
    question: "Tell me about a time you solved a problem.",
    weak: "I once had a problem at work and I sorted it out. I stayed calm and just dealt with it.",
    good: "At my weekend job in a hardware shop, we had a confused stock delivery. I took the initiative to sort and label the boxes by product category rather than waiting to be asked. My manager thanked me afterwards.",
    strong: "While helping at my uncle's garage, a hydraulic jack developed a leak mid-job. I noticed the fluid pooling beneath it and immediately shut off the valve to stop pressure building further. I then followed the COSHH guidance to contain and clean up the spill safely before it reached the drain. My uncle had not noticed until I flagged it. He told me later that if I had not caught it when I did, the spill would have reached the water drain and triggered an environmental incident. The experience taught me that spotting a problem early and acting on procedure — rather than hoping it goes away — is what separates a competent worker from a liability.",
    why: "The strong answer shows safety awareness, uses 'I' throughout, explains the consequence of the action and draws a professional lesson. This is exactly the kind of answer construction employers remember."
  },
  {
    label: "Safety awareness",
    question: "Tell me about a time you showed safety awareness.",
    weak: "I always try to be safe. I wear my PPE and follow the rules.",
    good: "During my school technology class, I noticed a classmate was about to use a sander without safety glasses. I told them before they started and they put the glasses on.",
    strong: "On my work experience placement, I was asked to help clear rubble from a demolition area. Before starting, I noticed there was no dust suppression in place and the operative nearby had no dust mask. I flagged it to the site manager rather than just putting on my own mask and carrying on. He confirmed silica dust was present in the rubble and immediately stopped work until water suppression was set up and everyone had the correct RPE. The site manager told me that flagging it rather than just protecting myself alone was exactly what he wanted to see from someone new to site. I understood then that safety culture is not about protecting yourself — it is about protecting everyone.",
    why: "This answer shows the candidate understands that safety is collective, not individual. Stopping the whole operation rather than just protecting themselves shows genuine safety culture. This is a standout answer for any construction employer."
  },
  {
    label: "Handling mistakes",
    question: "How do you handle criticism or a mistake?",
    weak: "I do not really make mistakes. I am quite careful. But when I do I just move on.",
    good: "I see mistakes as learning opportunities. I once applied the wrong finish to a piece of wood in class. My teacher pointed it out and I redid it correctly. I now always double-check before starting.",
    strong: "During my work experience on a building site, I was asked to cut a length of timber to specification. I misread the measurement and cut it 20mm short. I told the site supervisor immediately rather than hoping nobody would notice. He confirmed the piece could not be used and we cut a replacement. He also showed me the double-measure technique — marking, then re-checking against the original spec before cutting — which I have used on every cut since. The piece wasted about five minutes and a small amount of material. Concealing it would have wasted far more if it had been built in. I learned that early honesty is always cheaper than late discovery.",
    why: "The strong answer is honest about the mistake, shows immediate accountability, includes what was learned and how it changed behaviour. The final line demonstrates professional maturity."
  },
];

const INTERVIEW_QS = [
  { q: "Tell me about yourself.", tip: "Keep it focused — education, any practical or work experience, and why you want construction. 60 to 90 seconds maximum.", weak: "Um, I am just a normal person. I like gaming and hanging out with friends. I do not have much experience but thought this looked ok.", strong: "I am 18 and just finished my Nat5s at Riverside Academy. I have been volunteering at weekends helping a family friend who runs a small building company — mostly labouring, mixing and general site tidying — and I have found the environment really suits how I learn. I want to turn that into a qualified trade, and this apprenticeship offers the structure and progression I am looking for." },
  { q: "Why do you want a construction apprenticeship?", tip: "Show you understand what the apprenticeship actually involves. Mention the earn-while-you-learn aspect and the qualification pathway.", weak: "I do not know, I thought it would be easy. My cousin did one and said it is good money.", strong: "I have always preferred learning by doing rather than just reading about things. Construction suits that — every day you can see what you have built. I took a bricklaying course at college last year and found it genuinely satisfying when the wall came out right. I want a career where the output is visible and the standard is measurable, and an apprenticeship lets me earn while I work towards a qualification I can build on." },
  { q: "What do you know about our company or this sector?", tip: "Do real research. Find one specific project, contract or value from their website. Generic answers fail here.", weak: "Not much, sorry. I just saw the job listed and it seemed local.", strong: "I have researched your work on the Glasgow housing regeneration contract and I was interested in the way you approach energy-efficient builds on older stock. That kind of work — retrofitting rather than demolishing — is where I think construction is heading, and I want to be trained by people who take that seriously. I also read that you take apprentices to live sites from year one, which is exactly the kind of hands-on learning I am looking for." },
  { q: "What would you do if you saw a colleague not following a safety procedure?", tip: "Safety overrides social awkwardness every time. Show you understand that and that you would act, not ignore it.", weak: "That is not my job. I would mind my own business and let the supervisor deal with it.", strong: "I would say something directly and calmly — I noticed you are not wearing your mask, do you want a spare? — rather than immediately escalating, which can feel aggressive. If they ignored me or the issue was serious enough to cause immediate harm, I would go straight to the supervisor. Safety on site is collective — if something goes wrong, it affects everyone. Staying quiet is not being polite, it is being irresponsible." },
  { q: "How do you handle being corrected or criticised?", tip: "Construction work involves constant feedback. Show you take it professionally and learn from it.", weak: "I do not really like being told I am wrong. I usually think I am right.", strong: "I see correction as part of training — if someone more experienced tells me my technique is wrong, that is exactly the information I need to improve. On my work experience placement I was corrected several times in the first two days on how I was mixing and handling materials. I wrote down what I had been shown that evening so I did not repeat the same errors. By the end of the week the site operative said I had improved significantly. I would rather be corrected early than develop a bad habit." },
  { q: "Where do you see yourself in five years?", tip: "Show ambition grounded in the trade pathway — SVQ, supervisory potential, further qualifications.", weak: "Honestly, just living comfortably. I have not really thought about it.", strong: "In five years I want to have completed my apprenticeship and be working as a qualified tradesperson on complex projects. I would like to start working towards supervisory responsibilities — site coordination, mentoring newer apprentices. Longer term I am interested in the HNC route and possibly a project management qualification. I want to stay in the trade, not just pass through it." },
  { q: "What questions do you have for us?", tip: "Never say no. Have at least three questions ready. Ask about learning, progression and the team.", weak: "No, I think I am good. You have covered it all.", strong: "I have three. First — what does the balance look like between on-site work and college time in the first year? Second — how is progress measured, and how often will I get formal feedback? And third — I noticed from your website you are working on a social housing retrofit project. Is that something apprentices get involved in?" },
  { q: "Can you give an example of working safely?", tip: "Employers want to hear that safety is something you think about naturally — not just when told to.", weak: "I always wear my PPE. Safety is important to me.", strong: "On my work experience placement, before we started clearing rubble from a demolition area, I noticed there was no dust suppression in place and no dust masks had been issued. I flagged it to the site manager before anyone started work. He confirmed there was silica dust risk in the rubble and stopped the job until proper controls were in place. He told me afterwards that raising it rather than just putting my own mask on was exactly the kind of thinking he looks for. Safety only works if everyone is protected — not just the person who noticed the hazard." },
];

const CASE_STUDIES = [
  { name: "Kezia", age: 17, outcome: "Got the apprenticeship", outcomeIcon: "✅", tag: "volunteer experience", story: "Kezia had no formal work experience but had spent two years helping at a family community food bank. She assumed this did not count. Her coach reframed it: she had handled enquiries from 50 or more families weekly, managed confidential data, and worked under pressure with distressed people. In her interview she used STAR to describe these as customer service and data management. The panel was impressed by her maturity and offered her the role within a week.", lesson: "Voluntary and informal experience is valid. Frame any helping role in professional language to show transferable skills." },
  { name: "Jordan", age: 18, outcome: "Rejected — then succeeded second time", outcomeIcon: "❌ then ✅", tag: "structured preparation", story: "Jordan applied to three councils and was rejected each time. Feedback said he seemed unengaged and gave vague answers. He reviewed his prep, realised he had been answering from memory without structure, and learned the STAR method. He practised with a mentor and researched each council's values specifically. On his fourth attempt, he tailored every answer to the council's customer charter. The panel noted his improvement and offered him the role.", lesson: "Rejection is data, not failure. Use feedback. Structured preparation with STAR answers tied to employer values makes the difference." },
  { name: "Amara", age: 16, outcome: "Got the apprenticeship", outcomeIcon: "✅", tag: "confidence through preparation", story: "Strong grades but Amara froze in mock interviews and went blank. Her coach had her write full answers and practise aloud daily — even to her bedroom mirror. She also called a live council contact centre just to hear how staff spoke. Over two weeks she internalised her examples. On interview day the panel commented on how composed she was.", lesson: "Confidence comes from preparation and repetition, not natural ability. Practise until it sounds natural, not memorised." },
  { name: "Marcus", age: 17, outcome: "Strong candidate — CV let him down", outcomeIcon: "⚠️", tag: "CV quality", story: "Marcus had strong experience — peer mentoring and part-time retail — but his CV was two lines long with typos. A recruiter almost discarded it. He revised it after feedback, turning each role into evidenced bullet points. With the improved CV he got interview invites immediately. He now knows how critical the first impression is.", lesson: "Your CV must reflect your full potential. Proofread, use formal language, quantify achievements. One weak CV can end an application before it starts." },
  { name: "Liam", age: 19, outcome: "Succeeded", outcomeIcon: "✅", tag: "disability and adjustments", story: "Liam has dyslexia and worried it would harm his application. His coach helped him use text-to-speech for drafting and arranged a spell-check workflow. At interview he confidently explained his dyslexia and how he manages it — showing self-awareness rather than hiding it. The employer arranged a support agreement and Liam started his apprenticeship with full backing.", lesson: "Do not hide a disability — prepare to discuss it positively. Reasonable adjustments are a legal right. Self-awareness and solutions are strengths." },
  { name: "Connor", age: 20, outcome: "Failed test — then re-offered", outcomeIcon: "❌ then ✅", tag: "test preparation", story: "Connor was offered an apprenticeship conditional on passing a maths assessment. He did not prepare — he assumed it would be easy — and failed. He asked to retake, spent three weeks practising basic numeracy (fractions, area, volume, measurement) and passed comfortably. He started a few weeks behind schedule.", lesson: "Prepare for every step. Even if you ace the interview, assessments require specific practice. Do not assume." },
  { name: "Sara", age: 22, outcome: "Rejected — then improved", outcomeIcon: "❌", tag: "body language and energy", story: "Sara applied for a civil engineering apprenticeship. She was very quiet and gave yes or no answers. Post-rejection feedback: she seemed uninterested. She practised speaking in low-pressure settings, expanded her answers, and focused on making eye contact. Her next interviews were markedly better and she landed an offer shortly after.", lesson: "Energy and body language matter as much as content. Practise smiling, eye contact and elaborating so interviewers can see your personality." },
  { name: "Fatima", age: 18, outcome: "Succeeded", outcomeIcon: "✅", tag: "English as second language", story: "English was Fatima's second language and she was nervous about interviews. She took extra English courses and practised by watching trade videos and repeating technical explanations aloud. At interview she asked for clarification when she needed it rather than guessing. The panel valued her clarity and multilingual background. She received additional time for written assessments.", lesson: "Language barriers can be managed. Use all available support. Asking for clarification is professional, not a weakness." },
];

const ROADMAP = [
  { phase: "Research & Targeting", weeks: "Weeks 1–2", tasks: ["Research 3–5 target employers on Apprenticeships.Scot", "Read job descriptions and person specs carefully", "Identify which trade apprenticeship suits you and why", "Check typical start dates and application deadlines"] },
  { phase: "CV & Documents", weeks: "Weeks 3–4", tasks: ["Draft your CV using the TASS CV framework", "Get it reviewed by a teacher or careers adviser", "Gather school certificates, ID and references", "Prepare two referees and brief them on what you need"] },
  { phase: "Application Writing", weeks: "Weeks 5–6", tasks: ["Write a tailored personal statement for each employer", "Use STAR method for all competency questions", "Mirror the employer's language from the job advert", "Double-check spelling, grammar and formatting before submitting"] },
  { phase: "Test Preparation", weeks: "Weeks 7–8", tasks: ["Download the CITB GT100 guide (free)", "Complete at least 3 practice CITB HS&E tests", "Practise trade maths: measurements, area, ratios", "Book your CITB test early if required"] },
  { phase: "Interview Preparation", weeks: "Weeks 9–10", tasks: ["Research the specific employer in depth", "Prepare 5 STAR answers covering different competencies", "Practise aloud to a friend, mirror or recording", "Prepare 3 strong questions to ask the interviewer"] },
  { phase: "Interview and Assessment Day", weeks: "Weeks 11–12", tasks: ["Confirm logistics — location, time, dress code, travel", "Arrive 10–15 minutes early", "Bring certificates, ID and your reference contacts", "Send a thank-you email within 24 hours"] },
];

function Callout({ text, type = "tip" }) {
  const s = {
    tip:     { bg: "#FFFBEB", border: AMBER, col: "#92400E" },
    info:    { bg: "#EFF6FF", border: TEAL,  col: "#1A5276" },
    warning: { bg: "#FEF2F2", border: RUST,  col: "#7F1D1D" },
    success: { bg: "#F0FDF4", border: GREEN, col: "#14532D" },
  }[type] || { bg: "#FFFBEB", border: AMBER, col: "#92400E" };
  return (
    <div style={{ background: s.bg, borderLeft: `4px solid ${s.border}`, borderRadius: 8, padding: "11px 13px", marginBottom: 14 }}>
      <p style={{ color: s.col, fontSize: 13, lineHeight: 1.65, margin: 0 }}>{text}</p>
    </div>
  );
}

function SectionHeader({ icon, title, subtitle }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <h2 style={{ color: NAVY, fontSize: 19, fontWeight: 900, margin: 0, letterSpacing: "-0.01em", textTransform: "uppercase" }}>{title}</h2>
      </div>
      <div style={{ height: 3, width: 44, background: AMBER, borderRadius: 2, marginBottom: 8 }} />
      {subtitle && <p style={{ color: "#444", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{subtitle}</p>}
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 10, padding: 16, marginBottom: 12, ...style }}>
      {children}
    </div>
  );
}

function TabBar({ options, active, onSelect }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
      {options.map((opt, i) => {
        const id = typeof opt === "object" ? opt.id : opt;
        const label = typeof opt === "object" ? opt.label : opt;
        const isActive = active === id;
        return (
          <button key={i} onClick={() => onSelect(id)}
            style={{ background: isActive ? AMBER : "#fff", color: isActive ? NAVY : "#777", border: `1px solid ${isActive ? AMBER : "#E2E8F0"}`, borderRadius: 20, padding: "6px 12px", fontSize: 11, fontWeight: isActive ? 800 : 400, cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 0.3, whiteSpace: "nowrap" }}>
            {label}
          </button>
        );
      })}
    </div>
  );
}

function SectorModule() {
  const [open, setOpen] = useState(null);
  const items = [
    { title: "What is the construction sector?", content: "Scotland's construction sector is one of the largest employers in the country — covering everything from building individual houses to major infrastructure like roads, bridges and utilities.\n\nThe trades divide into:\n• Building trades: carpentry, bricklaying, plastering, painting, roofing, tiling\n• Services trades: plumbing, heating, electrical installation, gas engineering\n• Civil engineering: roads, drainage, bridges, earthworks\n• Plant operations: excavators, cranes, piling, groundworks\n\nKey industry bodies: CITB (Construction Industry Training Board), SNIPEF (plumbing), SELECT (electrical), and SDS (Skills Development Scotland)." },
    { title: "Major Scottish employers", content: "Local authorities: Glasgow City Council, City of Edinburgh, Aberdeen City — housing maintenance, school builds, infrastructure.\n\nNational bodies: Scottish Water, Network Rail, Transport Scotland — utilities and infrastructure.\n\nMajor contractors: Balfour Beatty, Kier, Morrison, BAM, Morgan Sindall, Wates, Robertson, Graham — active across Scotland.\n\nSMEs: Thousands of small and medium building firms who take apprentices directly — often offer the most hands-on early learning.\n\nDo not overlook smaller employers. They frequently provide better one-to-one training environments than large corporate sites." },
    { title: "Why construction is a strong career choice", content: "• Scotland needs 22,000 new construction workers per year (CITB forecast)\n• Net zero targets are creating a wave of new work: heat pumps, retrofitting, renewable energy infrastructure\n• Qualifications are nationally and internationally recognised\n• Progression is clear: apprentice — qualified tradesperson — supervisor — contracts manager — director\n• Chartered status (CIOB, CIBSE, ICE) is achievable from trade routes\n• Scotland's housing backlog, road infrastructure investment and school building programme mean demand will not slow\n\nConstruction is not a fallback. It is a profession with genuine career depth." },
    { title: "Typical working environment", content: "Construction apprentices work on real sites from day one. Expect:\n\n• Early starts — often 7:00 to 7:30am\n• Physical work — lifting, carrying, working at height, outdoor exposure\n• Rotating sites — you may not work in the same location every day\n• Structured supervision — your work will be checked frequently on safety and quality\n• College blocks — most MAs include day release or block release\n• PPE is not optional — it is a condition of being on site\n\nAsk at interview: what does a typical day look like for an apprentice? This shows genuine interest and prepares you for reality." },
    { title: "Apprenticeship vs college vs direct employment", content: "Modern Apprenticeship (MA):\n• Earn while you learn — paid from day one\n• Leads to SVQ and nationally recognised qualification\n• 1 to 4 years depending on trade and level\n• Best route into the trades for most people\n\nFull-time college:\n• No wage while studying\n• Builds theoretical knowledge first\n• Some employers prefer this background for technical roles\n\nDirect employment (labouring):\n• Gets you on site immediately\n• No structured qualification without an MA\n• Can lead to an apprenticeship if you prove yourself\n\nFor most young people, the MA is the right route — paid, qualified, and with structured progression." },
  ];
  return (
    <div>
      <SectionHeader icon="🔍" title="Sector Overview" subtitle="What construction is, who the employers are, and why it is a serious career choice." />
      {items.map((item, i) => (
        <div key={i} style={{ background: "#fff", border: `1px solid ${open === i ? AMBER : "#E2E8F0"}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", borderRadius: 10, overflow: "hidden", marginBottom: 10 }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            style={{ width: "100%", background: "none", border: "none", padding: "13px 15px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: "inherit" }}>
            <span style={{ color: NAVY, fontWeight: 700, fontSize: 14, textAlign: "left" }}>{item.title}</span>
            <span style={{ color: AMBER, fontSize: 20, flexShrink: 0 }}>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <div style={{ padding: "0 15px 15px", borderTop: "1px solid #E2E8F0" }}>
              <p style={{ color: "#444", fontSize: 13, lineHeight: 1.75, margin: "12px 0 0", whiteSpace: "pre-line" }}>{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PathwaysModule() {
  const paths = [
    { trade: "Carpentry & Joinery",     level: "SCQF 6",   duration: "2–3 years", qual: "SVQ L2/L3", body: "CITB",        entry: "Nat5 English and Maths preferred",               next: "HNC Construction, Site Supervisor",
      desc: "Carpenters and joiners work with timber to create and install structural and decorative elements in buildings. This includes framing walls and roofs, fitting doors, windows and staircases, laying floors, installing skirting boards and architraves, and producing bespoke joinery items in a workshop. It is one of the most versatile trades — carpenters work on everything from new-build housing to heritage restoration. A skilled joiner can see the results of their work in every building they help complete." },
    { trade: "Bricklaying",             level: "SCQF 5/6", duration: "2 years",   qual: "SVQ L2",   body: "CITB",        entry: "Nat5 English and Maths preferred",               next: "Advanced Bricklaying, Site Work",
      desc: "Bricklayers build the walls, foundations and structures that form the bones of buildings. They lay bricks, blocks and stone using mortar, following plans and specifications to exact measurements. Bricklayers work on everything from individual houses to large-scale commercial and public buildings. The trade requires physical fitness, a good eye for straight lines and levels, and patience to produce clean, accurate work. In Scotland there is strong demand for bricklayers across housing, school building and commercial construction projects." },
    { trade: "Plumbing & Heating",      level: "SCQF 7",   duration: "4 years",   qual: "SVQ L3",   body: "SNIPEF",      entry: "Nat5 English, Maths and Technical subject",      next: "Gas Engineer, Heating Systems Specialist",
      desc: "Plumbers and heating engineers install, maintain and repair the systems that supply water, remove waste and provide heat in buildings. This covers cold and hot water supply, central heating systems, radiators, boilers, underfloor heating, heat pumps and renewable energy systems. In Scotland, the only recognised route is the 4-year Modern Apprenticeship in Plumbing and Heating managed by SNIPEF. As Scotland transitions to low-carbon heating — replacing gas boilers with heat pumps — demand for qualified plumbers has never been higher." },
    { trade: "Electrical Installation",  level: "SCQF 7",   duration: "3–4 years", qual: "SVQ L3",   body: "SELECT/CITB", entry: "Nat5 English, Maths, Physics preferred",          next: "HNC Electrical Engineering, Contracts Manager",
      desc: "Electrical installation apprentices learn to install, test and maintain the wiring systems, circuits, lighting, power outlets and control systems in buildings of all types. Electricians work from technical drawings, running cables through walls and ceilings, connecting distribution boards and ensuring all work meets strict safety standards set by BS7671 (the Wiring Regulations). The electrical trade is central to Scotland's net zero transition — EV charger installation, solar panel systems and smart building controls are all growth areas." },
    { trade: "Plastering & Dry Lining",  level: "SCQF 5/6", duration: "2 years",   qual: "SVQ L2",   body: "CITB",        entry: "Nat5 preferred, practical aptitude",             next: "Advanced Plastering, Site Finishing",
      desc: "Plasterers apply smooth, durable coatings to internal walls and ceilings, creating the finished surfaces that the rest of the building's decoration depends on. There are two main methods: wet plastering (applying layers of wet plaster using a trowel) and dry lining (fixing pre-made plasterboard to create flat, smooth surfaces quickly). Plasterers also repair and restore damaged plaster in older buildings, which requires skill and sensitivity. The trade rewards those with a steady hand, good spatial awareness and patience for achieving a truly flat, seamless finish." },
    { trade: "Painting & Decorating",   level: "SCQF 5/6", duration: "2 years",   qual: "SVQ L2",   body: "CITB",        entry: "Nat5 preferred",                                  next: "Specialist Finishes, Heritage Restoration",
      desc: "Painters and decorators apply protective and decorative finishes to internal and external surfaces — walls, ceilings, woodwork, metalwork and more. The trade involves much more than applying paint: preparation (filling, sanding, priming), selecting the right products for each surface and environment, applying finishes by brush, roller and spray, and hanging wallpaper and other wall coverings. Specialist decorators work on heritage buildings, theatrical sets and high-end interiors, using traditional techniques including gilding, murals and specialist paint effects." },
    { trade: "Roofing",                 level: "SCQF 5/6", duration: "2–3 years", qual: "SVQ L2",   body: "CITB",        entry: "Nat5 preferred, no fear of heights",              next: "Advanced Roofing, Heritage Slating",
      desc: "Roofers install and repair the coverings that protect buildings from the Scottish weather. This includes laying slates and tiles, fitting flat roofing systems (felt, GRP, EPDM), installing gutters and rainwater systems, and applying flashing around chimneys, skylights and walls. Roofers work at height every day and must be comfortable with scaffolding, roof ladders and safety harnesses. The trade has strong demand in Scotland given the volume of older housing stock requiring re-roofing, as well as new-build and commercial roofing projects." },
    { trade: "Plant Operations",        level: "SCQF 5/6", duration: "1–2 years", qual: "SVQ L2 + CPCS", body: "CITB",  entry: "Nat5 preferred, clean driving licence helpful",   next: "CPCS Advanced, Crane Operator, Site Supervisor",
      desc: "Plant operators are responsible for operating heavy construction machinery — excavators, bulldozers, dumpers, telescopic handlers, piling rigs and cranes. They prepare and clear sites, dig foundations, move materials, and carry out earthworks for roads and infrastructure. Every machine requires a specific CPCS (Construction Plant Competence Scheme) card to operate legally on site. Plant operators are critical from the very first day of any major project and are consistently among the most in-demand workers in construction across Scotland." },
  ];
  const [active, setActive] = useState(0);
  const p = paths[active];
  return (
    <div>
      <SectionHeader icon="📋" title="Apprenticeship Pathways" subtitle="All 8 trade routes — qualifications, duration, entry requirements and where they lead." />
      <Callout text="All Scottish Modern Apprenticeships are open to anyone aged 16 and above. There is no upper age limit. You earn a wage from day one." type="success" />
      <TabBar options={paths.map((p, i) => ({ id: i, label: p.trade.split(" ")[0] }))} active={active} onSelect={setActive} />
      <Card>
        <p style={{ color: AMBER, fontWeight: 800, fontSize: 15, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: 0.5 }}>{p.trade}</p>
        <p style={{ color: "#444", fontSize: 14, lineHeight: 1.75, margin: "0 0 14px", paddingBottom: 14, borderBottom: "1px solid #E2E8F0" }}>{p.desc}</p>
        {[["SCQF Level", p.level], ["Duration", p.duration], ["Qualification", p.qual], ["Managed by", p.body], ["Entry requirements", p.entry], ["Progression", p.next]].map(([label, val], i) => (
          <div key={i} style={{ display: "flex", gap: 12, padding: "9px 0", borderBottom: i < 5 ? "1px solid #F0F4F8" : "none" }}>
            <span style={{ color: "#666", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, minWidth: 110, flexShrink: 0 }}>{label}</span>
            <span style={{ color: NAVY, fontSize: 13, lineHeight: 1.5 }}>{val}</span>
          </div>
        ))}
      </Card>
      <Card>
        <p style={{ color: TEAL, fontWeight: 700, fontSize: 12, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: 0.5 }}>Recruitment calendar</p>
        {[
          ["Local Authorities", "Jan–Feb", "Mar–Apr", "Aug–Sept"],
          ["Large Contractors", "Feb–Apr", "May–Jun", "Oct"],
          ["Plumbing via SNIPEF", "Oct–Feb", "Feb–Apr", "Aug"],
          ["Electrical via SELECT", "Spring", "May–Jun", "Sept"],
          ["Scottish Water/utilities", "Feb–Mar", "Mar–Apr", "Aug"],
          ["Apprenticeships.Scot", "Year-round", "Varies", "Varies"],
        ].map(([employer, open, close, start], i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 6, padding: "7px 0", borderBottom: i < 5 ? "1px solid #F0F4F8" : "none", alignItems: "center" }}>
            <span style={{ color: NAVY, fontSize: 12 }}>{employer}</span>
            <span style={{ color: TEAL, fontSize: 10, fontWeight: 700 }}>Opens: {open}</span>
            <span style={{ color: AMBER, fontSize: 10, fontWeight: 700 }}>Closes: {close}</span>
            <span style={{ color: GREEN, fontSize: 10, fontWeight: 700 }}>Start: {start}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

function ExampleCard({ ex }) {
  const [show, setShow] = useState(null);
  return (
    <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
      <div style={{ background: NAVY, padding: "10px 14px" }}>
        <p style={{ color: TEAL, fontWeight: 700, fontSize: 13, margin: 0 }}>Profile: {ex.label}</p>
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <button onClick={() => setShow(show === "weak" ? null : "weak")}
            style={{ flex: 1, padding: "8px 6px", background: show === "weak" ? RUST : "#fff", border: `2px solid ${RUST}`, color: show === "weak" ? "#fff" : RUST, borderRadius: 8, fontWeight: 700, fontSize: 11, cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase" }}>
            {show === "weak" ? "Hide" : "✗ Weak"}
          </button>
          <button onClick={() => setShow(show === "strong" ? null : "strong")}
            style={{ flex: 1, padding: "8px 6px", background: show === "strong" ? GREEN : "#fff", border: `2px solid ${GREEN}`, color: show === "strong" ? "#fff" : GREEN, borderRadius: 8, fontWeight: 700, fontSize: 11, cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase" }}>
            {show === "strong" ? "Hide" : "✓ Strong"}
          </button>
        </div>
        {show === "weak" && (
          <div style={{ background: "#FEF2F2", border: `1px solid ${RUST}30`, borderLeft: `3px solid ${RUST}`, borderRadius: 8, padding: 12 }}>
            <p style={{ color: RUST, fontWeight: 700, fontSize: 11, textTransform: "uppercase", margin: "0 0 6px" }}>✗ Weak — no research, no evidence</p>
            <p style={{ color: "#7F1D1D", fontSize: 13, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>{ex.weak}</p>
          </div>
        )}
        {show === "strong" && (
          <div style={{ background: "#F0FDF4", border: `1px solid ${GREEN}30`, borderLeft: `3px solid ${GREEN}`, borderRadius: 8, padding: 12 }}>
            <p style={{ color: GREEN, fontWeight: 700, fontSize: 11, textTransform: "uppercase", margin: "0 0 6px" }}>✓ Strong — specific, researched, evidenced</p>
            <p style={{ color: "#14532D", fontSize: 13, lineHeight: 1.75, margin: 0, whiteSpace: "pre-line" }}>{ex.strong}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ApplyModule() {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "Research & targeting", icon: "🔍", content: "Identify which apprenticeship suits you and which employers to target. Use Apprenticeships.Scot and MyJobScotland as your primary portals. Read every job description in full — the person specification is what you will be scored against.\n\nResearch the employer specifically: what do they build, what do they value, what recent projects have they worked on? Generic applications fail.", tip: "Save the job advert before applying — it sometimes disappears after the closing date." },
    { title: "Prepare your documents", icon: "📋", content: "Before you apply, gather:\n• Updated CV (use the CV tab)\n• National 5 results and school certificates\n• Passport or birth certificate\n• Two referee contacts: teachers, coaches, employers\n• Any relevant certificates: CSCS card, first aid, CITB card if held\n\nHaving everything ready means you can apply quickly when a role opens — some close within days.", tip: "Brief your referees before listing them. Tell them what the role involves and what you would like them to highlight." },
    { title: "Apprenticeships.Scot and MyJobScotland", icon: "🌐", content: "Create accounts on both portals. Complete your profile fully — incomplete profiles are screened out before a human reads them.\n\nApprenticeships.Scot:\n• Filter by Modern Apprenticeship and your trade\n• Set up email alerts so you are notified when new roles are posted\n\nMyJobScotland (for council jobs):\n• Your profile is your application foundation — complete every section\n• Use the personal statement box; do not leave it to your CV alone\n• Most council applications score each answer against a competency framework", tip: "Set your alerts to immediate notification, not weekly digest. Some roles close within 48 hours of posting." },
    { title: "Writing your personal statement", icon: "✍️", content: "The personal statement is 150 to 200 words. It answers three questions:\n1. Who are you and what relevant background do you have?\n2. Why this apprenticeship — what specifically attracts you?\n3. Why this employer — what have you found in your research?\n\nPart 3 is what most candidates skip. Mentioning a specific project, contract or value from the employer's website transforms a generic statement into a targeted one.\n\nUse STAR principles: do not just claim skills, briefly evidence them.", tip: "Never send the same personal statement to two different employers. Each one must name the employer and reference something specific about them.",
      examples: [
        { label: "School leaver (16–18)", weak: "I am applying for this apprenticeship because I want to learn a trade. I am hardworking and reliable and I enjoy working with my hands. I think this would be a great opportunity for me.", strong: "I am a motivated 17-year-old from Paisley with practical experience gained through two years of Saturday volunteering with a local building company, where I assisted with labouring, mixing and site clearance on residential projects. I have strong attention to detail and a genuine passion for construction — I took a bricklaying introductory course at college last year and found the precision involved genuinely satisfying.\n\nI am applying to Morrison Construction specifically because of your commitment to community benefit clauses and local supply chains on Scottish public sector projects. I want to start my career with a company that takes its responsibilities to the communities it builds in seriously, and develop into a skilled tradesperson who delivers work to the highest standard." },
        { label: "Career changer (19–29)", weak: "I have been working in retail but I want to change career. I am a hard worker and I think I would be good at construction. I am ready for a new challenge.", strong: "After three years working as a retail supervisor, I have made a deliberate decision to pursue a career in the construction trade. My retail experience has given me strong communication skills, the ability to work under pressure and a track record of reliability — but I want to work in a role where the output is visible and the standards are measurable.\n\nI completed an introductory carpentry course at West Lothian College earlier this year and found the practical, problem-solving nature of the work exactly suited to how I learn. I am applying to Robertson Construction because of your structured apprenticeship programme and your reputation for developing people from within — I want to build a long-term career, not just find a new job." },
      ]
    },
    { title: "Submitting and following up", icon: "📤", content: "Before you submit:\n• Read every answer aloud — errors you cannot see, you can hear\n• Ask a teacher or adviser to review once\n• Check the application is complete with no blank fields\n• Confirm you have named the employer and role correctly\n\nAfter submitting:\n• Note the closing date and expected decision date in your calendar\n• Keep applying to other roles — do not wait for one response\n\nAfter rejection:\n• Ask for feedback if offered — it is the most valuable information you can get\n• Use it to improve your next application", tip: "Follow the employer on LinkedIn. Knowing about their recent projects makes you a sharper candidate at interview." },
  ];
  const s = steps[step];
  return (
    <div>
      <SectionHeader icon="📝" title="How to Apply" subtitle="Step-by-step from first research to submitted application." />
      <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto", paddingBottom: 4 }}>
        {steps.map((st, i) => (
          <button key={i} onClick={() => setStep(i)}
            style={{ background: step === i ? AMBER : "#fff", color: step === i ? NAVY : "#666", border: `1px solid ${step === i ? AMBER : "#E2E8F0"}`, borderRadius: 20, padding: "6px 12px", fontSize: 11, fontWeight: step === i ? 800 : 400, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: 0.3 }}>
            {i + 1}. {st.icon}
          </button>
        ))}
      </div>
      <Card>
        <p style={{ color: AMBER, fontWeight: 800, fontSize: 14, margin: "0 0 4px", textTransform: "uppercase" }}>{s.icon} {s.title}</p>
        <div style={{ height: 2, width: 28, background: AMBER, borderRadius: 2, marginBottom: 12 }} />
        <p style={{ color: "#444", fontSize: 14, lineHeight: 1.75, margin: "0 0 12px", whiteSpace: "pre-line" }}>{s.content}</p>
        <div style={{ background: "#F0FDF4", border: `1px solid ${GREEN}30`, borderLeft: `3px solid ${GREEN}`, borderRadius: 8, padding: "9px 12px" }}>
          <p style={{ color: GREEN, fontSize: 12, lineHeight: 1.6, margin: 0 }}>💡 {s.tip}</p>
        </div>
      </Card>
      {s.examples && (
        <div style={{ marginTop: 4 }}>
          <p style={{ color: NAVY, fontWeight: 800, fontSize: 13, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: 0.5 }}>Personal statement examples</p>
          {s.examples.map((ex, i) => (
            <ExampleCard key={i} ex={ex} />
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        {step > 0 && <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: 12, background: "#fff", border: "1px solid #E2E8F0", color: NAVY, borderRadius: 8, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}>← Previous</button>}
        {step < steps.length - 1 && <button onClick={() => setStep(s => s + 1)} style={{ flex: 1, padding: 12, background: AMBER, border: "none", color: NAVY, borderRadius: 8, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}>Next →</button>}
      </div>
    </div>
  );
}

function CVModule() {
  const [section, setSection] = useState("personal");
  const [reveal, setReveal] = useState(null);
  const sections = {
    personal: { label: "Personal Statement", prompt: "3–4 sentences. Who are you? What practical experience or interests do you have? Why this apprenticeship?", weak: "I am a hard worker who wants an apprenticeship. I am a fast learner and good in a team.", strong: "Motivated 18-year-old with practical experience gained through weekend volunteering with a family-run building company, where I developed skills including mixing, labouring and using basic hand tools safely. I have strong teamwork and problem-solving skills developed through school projects and competitive football. I am keen to start a construction apprenticeship to turn my passion for building into a skilled trade qualification, and to develop into a competent professional who makes a real contribution to quality projects." },
    skills: { label: "Skills and Evidence", prompt: "List 4–6 skills, each with a brief specific example. Never just list the word — prove it.", weak: "Good communication. Team player. Organised. Hard working. Fast learner.", strong: "Communication: Explained tool-use steps to classmates in woodwork class, adapting my approach for those less confident with equipment.\nTeamwork: Coordinated a 6-person school tech project, assigning tasks and supporting teammates to finish on schedule — awarded a Teacher Commendation.\nSafety awareness: During work experience on a building site, identified a silica dust hazard before starting a rubble-clearance task and flagged it to the site manager before work began.\nInitiative: Volunteered 80+ hours at a local community garden, independently organising planting days and sourcing donated materials." },
    experience: { label: "Work and Volunteer Experience", prompt: "Roles, dates, and bullet points using action verbs. Quantify where possible.", weak: "Helped at a building site sometimes. Did some volunteering. Saturday job at a shop.", strong: "Building Site Volunteer | Clark Family Building Services | June 2022 – Present\n• Assisted with labouring, material handling and site tidying across 6+ residential projects\n• Operated basic hand tools under supervision following full safety briefing\n• Maintained site tidiness and contributed to end-of-day close-down procedures\n\nRetail Assistant | HomeBase, Glasgow | Sept 2022 – Present\n• Served 50+ customers weekly across the tools and hardware department\n• Assisted with stock replenishment and weekly inventory checks\n• Trained two new colleagues on till operation and stock procedures" },
    activities: { label: "Activities and Interests", prompt: "Extract the skill, responsibility and result from each activity. Every entry should tell the employer something useful about you.", weak: "I like football and gaming. I watch DIY YouTube sometimes.", strong: "Football — Riverside FC (2019–present)\nTeam captain for the under-18 squad — responsible for pre-match briefings and communicating strategy during games. Demonstrates leadership, teamwork and performing under pressure.\n\nDIY Home Renovation\nHelped renovate my grandparents' kitchen — assisted with tiling, painting and fitting flatpack units. Motivated me to pursue a construction career and gave me an understanding of working carefully in a domestic environment.\n\nCommunity Volunteer — Annual Charity Build\nVolunteered at a local DIY SOS-style project for two consecutive years. Worked under site supervision on painting and clearance tasks, learning to take instruction and work safely alongside professional tradespeople." },
  };
  const s = sections[section];
  return (
    <div>
      <SectionHeader icon="📄" title="CV Builder" subtitle="Four sections with weak and strong examples. Evidence every skill — context, action, result." />
      <Callout text="Your CV is not a list of things you have done. It is a document that proves you can do the job. Evidence every skill — not just claim it." type="tip" />
      <TabBar options={Object.entries(sections).map(([k, v]) => ({ id: k, label: v.label.split(" ")[0] }))} active={section} onSelect={(id) => { setSection(id); setReveal(null); }} />
      <Card>
        <p style={{ color: AMBER, fontWeight: 800, fontSize: 13, margin: "0 0 6px", textTransform: "uppercase" }}>{s.label}</p>
        <p style={{ color: "#444", fontSize: 13, lineHeight: 1.6, margin: 0 }}>📝 {s.prompt}</p>
      </Card>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => setReveal(reveal === "weak" ? null : "weak")} style={{ flex: 1, padding: 10, background: reveal === "weak" ? RUST : "#fff", border: `2px solid ${RUST}`, color: reveal === "weak" ? "#fff" : RUST, borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase" }}>{reveal === "weak" ? "Hide" : "✗ Weak"}</button>
        <button onClick={() => setReveal(reveal === "strong" ? null : "strong")} style={{ flex: 1, padding: 10, background: reveal === "strong" ? GREEN : "#fff", border: `2px solid ${GREEN}`, color: reveal === "strong" ? "#fff" : GREEN, borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase" }}>{reveal === "strong" ? "Hide" : "✓ Strong"}</button>
      </div>
      {reveal === "weak" && <div style={{ background: "#FEF2F2", border: `1px solid ${RUST}30`, borderLeft: `3px solid ${RUST}`, borderRadius: 10, padding: 14, marginBottom: 12 }}><p style={{ color: RUST, fontWeight: 700, fontSize: 11, textTransform: "uppercase", margin: "0 0 8px" }}>✗ Weak — no evidence</p><pre style={{ color: "#444", fontSize: 13, whiteSpace: "pre-wrap", fontFamily: "inherit", margin: 0, lineHeight: 1.65 }}>{s.weak}</pre></div>}
      {reveal === "strong" && <div style={{ background: "#F0FDF4", border: `1px solid ${GREEN}30`, borderLeft: `3px solid ${GREEN}`, borderRadius: 10, padding: 14, marginBottom: 12 }}><p style={{ color: GREEN, fontWeight: 700, fontSize: 11, textTransform: "uppercase", margin: "0 0 8px" }}>✓ Strong — specific, evidenced</p><pre style={{ color: "#333", fontSize: 13, whiteSpace: "pre-wrap", fontFamily: "inherit", margin: 0, lineHeight: 1.65 }}>{s.strong}</pre></div>}
      <Card>
        <p style={{ color: TEAL, fontWeight: 700, fontSize: 12, margin: "0 0 8px", textTransform: "uppercase" }}>✍️ Draft your {s.label.toLowerCase()}</p>
        <textarea placeholder={`Write your ${s.label.toLowerCase()} here...`} rows={5} style={{ width: "100%", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, padding: 12, color: NAVY, fontSize: 13, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box", lineHeight: 1.65 }} />
        <p style={{ color: "#444", fontSize: 12, marginTop: 8, marginBottom: 0 }}>💡 Paste into the AI Coach for personalised feedback.</p>
      </Card>
    </div>
  );
}

function STARModule() {
  const [active, setActive] = useState(0);
  const [tier, setTier] = useState("strong");
  const ex = STAR_EXAMPLES[active];
  const tierCol = { weak: RUST, good: AMBER, strong: GREEN };
  const tierBg  = { weak: "#FEF2F2", good: "#FFFBEB", strong: "#F0FDF4" };
  return (
    <div>
      <SectionHeader icon="⭐" title="STAR Method" subtitle="The universal answer framework for construction apprenticeship interviews." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
        {[{ l:"S", w:"Situation", d:"Set the scene — where, when, what was happening." }, { l:"T", w:"Task", d:"What was YOUR specific responsibility?" }, { l:"A", w:"Action", d:"What did YOU do? Use 'I' not 'we'. Be specific." }, { l:"R", w:"Result", d:"What happened? Quantify if possible. What did you learn?" }].map((item, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 10, padding: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ width: 32, height: 32, borderRadius: 6, background: AMBER, color: NAVY, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 17, marginBottom: 8 }}>{item.l}</div>
            <p style={{ color: NAVY, fontWeight: 800, fontSize: 13, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.5 }}>{item.w}</p>
            <p style={{ color: "#444", fontSize: 12, lineHeight: 1.5, margin: 0 }}>{item.d}</p>
          </div>
        ))}
      </div>
      <Callout text="Use 'I' not 'we'. Your panel is assessing you — not your group or team. Describe specifically what YOU did and what difference YOUR actions made." type="warning" />
      <p style={{ color: NAVY, fontWeight: 800, fontSize: 13, margin: "16px 0 10px", textTransform: "uppercase", letterSpacing: 0.5 }}>Worked examples — three tiers</p>
      <TabBar options={STAR_EXAMPLES.map((e, i) => ({ id: i, label: e.label }))} active={active} onSelect={(id) => { setActive(id); setTier("strong"); }} />
      <Card>
        <p style={{ color: "#444", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 5px" }}>Interview question</p>
        <p style={{ color: NAVY, fontWeight: 800, fontSize: 15, margin: 0 }}>"{ex.question}"</p>
      </Card>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {["weak","good","strong"].map(t => (
          <button key={t} onClick={() => setTier(t)} style={{ flex: 1, padding: "8px 4px", background: tier === t ? tierCol[t] : "#fff", border: `2px solid ${tierCol[t]}`, color: tier === t ? (t === "good" ? NAVY : "#fff") : tierCol[t], borderRadius: 8, fontWeight: 700, fontSize: 11, cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase" }}>
            {t === "weak" ? "✗ Weak" : t === "good" ? "◎ Good" : "✓ Strong"}
          </button>
        ))}
      </div>
      <div style={{ background: tierBg[tier], border: `1px solid ${tierCol[tier]}30`, borderLeft: `3px solid ${tierCol[tier]}`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
        <p style={{ color: tierCol[tier], fontWeight: 800, fontSize: 11, textTransform: "uppercase", margin: "0 0 8px" }}>{tier === "weak" ? "✗ Weak" : tier === "good" ? "◎ Good" : "✓ Strong"} answer</p>
        <p style={{ color: "#333", fontSize: 14, lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>"{ex[tier]}"</p>
      </div>
      <div style={{ background: "#EFF6FF", borderLeft: `3px solid ${TEAL}`, borderRadius: 8, padding: 12, marginBottom: 16 }}>
        <p style={{ color: TEAL, fontWeight: 700, fontSize: 11, textTransform: "uppercase", margin: "0 0 4px" }}>Coach commentary</p>
        <p style={{ color: "#1A4A6B", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{ex.why}</p>
      </div>
      <Card>
        <p style={{ color: TEAL, fontWeight: 800, fontSize: 12, margin: "0 0 10px", textTransform: "uppercase" }}>✍️ Build your own STAR answer</p>
        {[{ label:"S — Situation", ph:"Where were you? When? What was happening?" }, { label:"T — Task", ph:"What was your specific responsibility?" }, { label:"A — Action", ph:"What did YOU do? (Use 'I', not 'we')" }, { label:"R — Result", ph:"What happened? What did you learn? Can you quantify it?" }].map((f, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <p style={{ color: AMBER, fontSize: 12, fontWeight: 700, margin: "0 0 4px", textTransform: "uppercase" }}>{f.label}</p>
            <textarea rows={2} placeholder={f.ph} style={{ width: "100%", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, padding: 10, color: NAVY, fontSize: 13, fontFamily: "inherit", resize: "none", boxSizing: "border-box" }} />
          </div>
        ))}
        <p style={{ color: "#444", fontSize: 12, margin: "4px 0 0" }}>💡 Paste into the AI Coach for feedback.</p>
      </Card>
    </div>
  );
}

function InterviewModule() {
  const [current, setCurrent] = useState(0);
  const [reveal, setReveal] = useState(null);
  const q = INTERVIEW_QS[current];
  return (
    <div>
      <SectionHeader icon="🎤" title="Interview Questions" subtitle="8 common construction apprenticeship questions — weak and strong answers with coach tips." />
      <Callout text="Construction employers care about attitude and potential as much as experience. Show you understand safety culture, can take instruction, and are genuinely motivated." type="tip" />
      <TabBar options={INTERVIEW_QS.map((_, i) => ({ id: i, label: `Q${i+1}` }))} active={current} onSelect={(id) => { setCurrent(id); setReveal(null); }} />
      <Card>
        <p style={{ color: "#444", fontSize: 11, textTransform: "uppercase", margin: "0 0 5px" }}>Interview question</p>
        <p style={{ color: NAVY, fontWeight: 800, fontSize: 15, margin: "0 0 12px" }}>"{q.q}"</p>
        <div style={{ background: "#F0FDF4", borderLeft: `3px solid ${TEAL}`, borderRadius: 8, padding: "9px 11px" }}>
          <p style={{ color: "#1A4A6B", fontSize: 13, lineHeight: 1.6, margin: 0 }}>💡 <strong style={{ color: TEAL }}>Tip:</strong> {q.tip}</p>
        </div>
      </Card>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => setReveal(reveal === "strong" ? null : "strong")} style={{ flex: 1, padding: 10, background: reveal === "strong" ? GREEN : "#fff", border: `2px solid ${GREEN}`, color: reveal === "strong" ? "#fff" : GREEN, borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase" }}>{reveal === "strong" ? "Hide" : "✓ Strong"}</button>
        <button onClick={() => setReveal(reveal === "weak" ? null : "weak")} style={{ flex: 1, padding: 10, background: reveal === "weak" ? RUST : "#fff", border: `2px solid ${RUST}`, color: reveal === "weak" ? "#fff" : RUST, borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase" }}>{reveal === "weak" ? "Hide" : "✗ Weak"}</button>
      </div>
      {reveal === "strong" && <div style={{ background: "#F0FDF4", border: `1px solid ${GREEN}30`, borderLeft: `3px solid ${GREEN}`, borderRadius: 10, padding: 14, marginBottom: 12 }}><p style={{ color: GREEN, fontWeight: 700, fontSize: 11, textTransform: "uppercase", margin: "0 0 8px" }}>✓ Strong Answer</p><p style={{ color: "#333", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{q.strong}</p></div>}
      {reveal === "weak" && <div style={{ background: "#FEF2F2", border: `1px solid ${RUST}30`, borderLeft: `3px solid ${RUST}`, borderRadius: 10, padding: 14, marginBottom: 12 }}><p style={{ color: RUST, fontWeight: 700, fontSize: 11, textTransform: "uppercase", margin: "0 0 8px" }}>✗ Weak Answer</p><p style={{ color: "#444", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{q.weak}</p></div>}
      <Card>
        <p style={{ color: TEAL, fontWeight: 700, fontSize: 12, margin: "0 0 8px", textTransform: "uppercase" }}>🎤 Practise your answer</p>
        <textarea placeholder="Type your answer using the STAR method..." rows={4} style={{ width: "100%", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, padding: 12, color: NAVY, fontSize: 13, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }} />
        <p style={{ color: "#444", fontSize: 12, marginTop: 8, marginBottom: 0 }}>💡 Paste into the AI Coach for feedback.</p>
      </Card>
    </div>
  );
}

function TechnicalModule() {
  const [trade, setTrade] = useState("carpentry");
  const [state, setState] = useState({});
  const qs = TECHNICAL_QS[trade] || [];

  function handleAnswer(i, j) {
    if (state[`${trade}-${i}`] !== undefined) return;
    setState(p => ({ ...p, [`${trade}-${i}`]: j }));
  }

  return (
    <div>
      <SectionHeader icon="🔧" title="Trade Technical Questions" subtitle="Select your trade. All 8 trades covered — multiple choice format, same as interview and assessment day." />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {TRADES.map(t => (
          <button key={t.id} onClick={() => { setTrade(t.id); setState({}); }}
            style={{ background: trade === t.id ? AMBER : "#fff", color: trade === t.id ? "#111" : "#777", border: `1px solid ${trade === t.id ? AMBER : "#E2E8F0"}`, borderRadius: 20, padding: "6px 11px", fontSize: 11, fontWeight: trade === t.id ? 800 : 400, cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 0.3 }}>
            {t.icon} {t.label.split(" ")[0]}
          </button>
        ))}
      </div>
      <p style={{ color: AMBER, fontWeight: 800, fontSize: 13, margin: "0 0 12px", textTransform: "uppercase" }}>{TRADES.find(t => t.id === trade)?.label} — 5 questions</p>
      {qs.map((q, i) => {
        const key = `${trade}-${i}`;
        const answered = state[key] !== undefined;
        const correctIdx = q.opts.indexOf(q.a);
        return (
          <div key={i} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 10, padding: 15, marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <p style={{ color: NAVY, fontWeight: 700, fontSize: 14, lineHeight: 1.55, margin: "0 0 12px" }}>{i + 1}. {q.q}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {q.opts.map((opt, j) => {
                let bg = "#F8FAFC", border = "1px solid #E2E8F0", col = "#555";
                if (answered) {
                  if (j === correctIdx) { bg = "#F0FDF4"; border = `1px solid ${GREEN}`; col = "#14532D"; }
                  else if (j === state[key]) { bg = "#FEF2F2"; border = `1px solid ${RUST}`; col = "#7F1D1D"; }
                }
                return (
                  <button key={j} onClick={() => handleAnswer(i, j)}
                    style={{ background: bg, border, color: col, borderRadius: 8, padding: "10px 12px", textAlign: "left", cursor: answered ? "default" : "pointer", fontSize: 13, fontFamily: "inherit", fontWeight: answered && j === correctIdx ? 700 : 400 }}>
                    <span style={{ fontWeight: 700, marginRight: 8 }}>{String.fromCharCode(65 + j)}.</span>{opt}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div style={{ marginTop: 10, background: "#EFF6FF", borderLeft: `3px solid ${TEAL}`, borderRadius: 8, borderRadius: 8, padding: "9px 12px" }}>
                <p style={{ color: state[key] === correctIdx ? GREEN : RUST, fontWeight: 700, fontSize: 11, margin: "0 0 4px", textTransform: "uppercase" }}>
                  {state[key] === correctIdx ? "✅ Correct" : `✗ Incorrect — answer: ${q.a}`}
                </p>
                <p style={{ color: "#1A4A6B", fontSize: 13, lineHeight: 1.6, margin: 0 }}>💡 {q.why}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CITBModule() {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [done, setDone] = useState(false);
  const q = CITB_QUESTIONS[qIdx];
  const pct = Math.round((score / CITB_QUESTIONS.length) * 100);

  function handleAnswer(i) {
    if (answered !== null) return;
    setAnswered(i);
    if (i === q.correct) setScore(s => s + 1);
  }

  function next() {
    if (qIdx + 1 >= CITB_QUESTIONS.length) { setDone(true); return; }
    setQIdx(q => q + 1); setAnswered(null);
  }

  function restart() { setQIdx(0); setScore(0); setAnswered(null); setDone(false); }

  if (done) return (
    <div>
      <SectionHeader icon="🦺" title="CITB Practice Test" subtitle="Health, Safety and Environment — 12 practice questions." />
      <div style={{ background: "#fff", borderRadius: 14, padding: 28, textAlign: "center", border: `2px solid ${pct >= 90 ? GREEN : pct >= 70 ? AMBER : RUST}` }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>{pct >= 90 ? "🏆" : pct >= 70 ? "💪" : "📖"}</div>
        <p style={{ color: pct >= 90 ? GREEN : pct >= 70 ? AMBER : RUST, fontWeight: 900, fontSize: 24, margin: "0 0 6px", textTransform: "uppercase" }}>{score} / {CITB_QUESTIONS.length}</p>
        <p style={{ color: "#444", fontSize: 14, marginBottom: 16 }}>{pct >= 90 ? "Excellent — you are at or above the 90% pass mark." : pct >= 70 ? "Good foundation — review the questions you got wrong." : "More preparation needed — work through the CITB GT100 guide and try again."}</p>
        <p style={{ color: AMBER, fontSize: 13, fontWeight: 700, margin: "0 0 20px" }}>Real test: 50 questions, 90% required to pass (45/50).</p>
        <button onClick={restart} style={{ padding: "12px 28px", background: AMBER, border: "none", color: NAVY, borderRadius: 8, fontWeight: 800, cursor: "pointer", fontSize: 14, fontFamily: "inherit", textTransform: "uppercase" }}>Try again</button>
      </div>
    </div>
  );

  return (
    <div>
      <SectionHeader icon="🦺" title="CITB HS&E Practice" subtitle="Health, Safety and Environment test — same format as the real exam." />
      <Callout text="The real CITB test: 50 questions, 90% pass mark (45/50). Download the free CITB GT100 guide and use the CITB revision app alongside this practice." type="tip" />
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#444", marginBottom: 6 }}>
          <span style={{ textTransform: "uppercase", letterSpacing: 0.5 }}>Question {qIdx + 1} of {CITB_QUESTIONS.length}</span>
          <span style={{ color: AMBER, fontWeight: 700 }}>Score: {score}</span>
        </div>
        <div style={{ background: "#F8FAFC", borderRadius: 99, height: 5 }}>
          <div style={{ background: AMBER, height: 5, borderRadius: 99, width: `${(qIdx / CITB_QUESTIONS.length) * 100}%`, transition: "width 0.3s" }} />
        </div>
      </div>
      <Card style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}><p style={{ color: NAVY, fontWeight: 700, fontSize: 15, lineHeight: 1.55, margin: 0 }}>{q.q}</p></Card>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
        {q.opts.map((opt, i) => {
          let bg = "#F8FAFC", border = "1px solid #E2E8F0", col = "#555";
          if (answered !== null) {
            if (i === q.correct) { bg = "#F0FDF4"; border = `1px solid ${GREEN}`; col = "#14532D"; }
            else if (i === answered) { bg = "#FEF2F2"; border = `1px solid ${RUST}`; col = "#7F1D1D"; }
          }
          return (
            <button key={i} onClick={() => handleAnswer(i)}
              style={{ background: bg, border, color: col, borderRadius: 9, padding: "11px 13px", textAlign: "left", cursor: answered === null ? "pointer" : "default", fontSize: 13, fontFamily: "inherit", fontWeight: answered !== null && i === q.correct ? 700 : 400 }}>
              <span style={{ fontWeight: 700, marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>{opt}
            </button>
          );
        })}
      </div>
      {answered !== null && (
        <>
          <div style={{ background: answered === q.correct ? "#F0FDF4" : "#FEF2F2", border: `1px solid ${answered === q.correct ? GREEN : RUST}40`, borderRadius: 10, padding: 13, marginBottom: 12 }}>
            <p style={{ color: answered === q.correct ? GREEN : RUST, fontWeight: 700, fontSize: 12, margin: "0 0 6px", textTransform: "uppercase" }}>{answered === q.correct ? "✅ Correct" : "✗ Incorrect"}</p>
            <p style={{ color: "#444", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{q.explain}</p>
          </div>
          <button onClick={next} style={{ width: "100%", padding: 14, background: AMBER, border: "none", color: NAVY, borderRadius: 10, fontWeight: 800, cursor: "pointer", fontSize: 14, fontFamily: "inherit", textTransform: "uppercase" }}>
            {qIdx + 1 >= CITB_QUESTIONS.length ? "See results" : "Next question →"}
          </button>
        </>
      )}
    </div>
  );
}

function CaseStudiesModule() {
  const [active, setActive] = useState(0);
  const c = CASE_STUDIES[active];
  return (
    <div>
      <SectionHeader icon="📚" title="Real Journeys" subtitle="8 stories from young people who applied for construction and trade apprenticeships." />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {CASE_STUDIES.map((cs, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{ background: active === i ? "#fff" : "#F8FAFC", border: active === i ? `1px solid ${AMBER}` : "1px solid #E2E8F0", borderRadius: 10, padding: "11px 14px", boxShadow: active === i ? "0 2px 8px rgba(0,0,0,0.06)" : "none", textAlign: "left", cursor: "pointer", fontFamily: "inherit" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: active === i ? NAVY : "#555", fontWeight: 700, fontSize: 13 }}>{c.name}, {cs.age}</span>
              <span style={{ fontSize: 12, color: active === i ? AMBER : "#555" }}>{cs.outcomeIcon}</span>
            </div>
            <span style={{ color: "#444", fontSize: 11 }}>#{cs.tag}</span>
          </button>
        ))}
      </div>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <div>
            <p style={{ color: NAVY, fontWeight: 900, fontSize: 17, margin: "0 0 3px" }}>{c.name}, {c.age}</p>
            <p style={{ color: AMBER, fontSize: 13, fontWeight: 700, margin: 0 }}>{c.outcomeIcon} {c.outcome}</p>
          </div>
          <span style={{ background: "#E2E8F0", color: "#444", fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 700, alignSelf: "flex-start" }}>#{c.tag}</span>
        </div>
        <p style={{ color: "#444", fontSize: 14, lineHeight: 1.75, marginBottom: 14 }}>{c.story}</p>
        <div style={{ background: "#EFF6FF", borderLeft: `4px solid ${TEAL}`, borderRadius: 8, padding: 12 }}>
          <p style={{ color: TEAL, fontWeight: 700, fontSize: 11, textTransform: "uppercase", margin: "0 0 4px" }}>📌 Key lesson</p>
          <p style={{ color: "#1A4A6B", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{c.lesson}</p>
        </div>
      </Card>
    </div>
  );
}

function RoadmapModule() {
  const [active, setActive] = useState(0);
  const phase = ROADMAP[active];
  return (
    <div>
      <SectionHeader icon="🗓️" title="12-Week Roadmap" subtitle="From first research to interview day. Preparation over time beats last-minute cramming every time." />
      <Callout text="Candidates who prepare over 8–12 weeks consistently outperform those who cram the week before applying — even when the late preparers have more experience." type="tip" />
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
        {ROADMAP.map((r, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{ background: active === i ? "#fff" : "#F8FAFC", border: active === i ? `1px solid ${AMBER}` : "1px solid #E2E8F0", borderRadius: 10, padding: "10px 14px", boxShadow: active === i ? "0 2px 8px rgba(0,0,0,0.06)" : "none", textAlign: "left", cursor: "pointer", fontFamily: "inherit", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: active === i ? NAVY : "#555", fontWeight: 700, fontSize: 13 }}>{r.phase}</span>
            <span style={{ color: active === i ? AMBER : "#888", fontSize: 11, fontWeight: 700 }}>{r.weeks}</span>
          </button>
        ))}
      </div>
      <Card>
        <p style={{ color: AMBER, fontWeight: 900, fontSize: 14, margin: "0 0 4px", textTransform: "uppercase" }}>{phase.phase}</p>
        <p style={{ color: "#444", fontSize: 12, margin: "0 0 12px", fontWeight: 700 }}>{phase.weeks}</p>
        {phase.tasks.map((task, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
            <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${AMBER}`, flexShrink: 0, marginTop: 2 }} />
            <span style={{ color: "#444", fontSize: 14, lineHeight: 1.55 }}>{task}</span>
          </div>
        ))}
      </Card>
      <Card>
        <p style={{ color: TEAL, fontWeight: 700, fontSize: 12, margin: "0 0 10px", textTransform: "uppercase" }}>Interview day — do and don't</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div style={{ background: "#F0FDF4", borderRadius: 8, padding: 12 }}>
            <p style={{ color: GREEN, fontWeight: 700, fontSize: 11, margin: "0 0 8px", textTransform: "uppercase" }}>✓ Do</p>
            {["Arrive 10–15 minutes early", "Wear smart, clean clothing", "Bring ID and certificates", "Ask at least 2 questions", "Make eye contact and engage"].map((t, i) => <p key={i} style={{ color: "#166534", fontSize: 12, margin: "0 0 4px" }}>• {t}</p>)}
          </div>
          <div style={{ background: "#FEF2F2", borderRadius: 8, padding: 12 }}>
            <p style={{ color: RUST, fontWeight: 700, fontSize: 11, margin: "0 0 8px", textTransform: "uppercase" }}>✗ Don't</p>
            {["Arrive late or unprepared", "Use casual or slang language", "Badmouth past employers", "Leave without asking anything", "Give yes/no answers only"].map((t, i) => <p key={i} style={{ color: "#991B1B", fontSize: 12, margin: "0 0 4px" }}>• {t}</p>)}
          </div>
        </div>
      </Card>
    </div>
  );
}

function EDIModule() {
  const [open, setOpen] = useState(null);
  const items = [
    { title: "The Equality Act 2010", content: "The Equality Act 2010 protects nine characteristics: age, disability, sex, race, religion or belief, sexual orientation, gender reassignment, marriage or civil partnership, and pregnancy or maternity. No employer can legally discriminate against you during recruitment.\n\nConstruction has historically been a less diverse industry than many others. This is changing — and employers who take equality seriously are actively recruiting from groups that have been under-represented." },
    { title: "Reasonable adjustments", content: "If you have a disability, neurodivergent condition or other need, you have the right to ask for reasonable adjustments. These might include:\n• Extra time for written tests\n• The CITB HS&E test in audio format or another language\n• An accessible venue\n• A rest break during assessments\n• Questions provided in advance\n\nRequesting adjustments will not disadvantage your application. Ask early — as soon as you are invited to interview or assessment." },
    { title: "CITB test accessibility", content: "The CITB HS&E test is available in multiple languages and with audio voiceover. If English is not your first language or you have a reading difficulty, contact the CITB test centre in advance to arrange the appropriate format.\n\nScottish Apprenticeship Week events often include information on accessibility support — attend if you can." },
    { title: "Guaranteed Interview Scheme", content: "Many Scottish public sector employers — including councils — operate a Guaranteed Interview Scheme for disabled candidates who meet the minimum essential criteria. If you declare a disability and meet the minimum requirements, you are guaranteed to be interviewed.\n\nThis applies to the selection stage, not the final decision — you still need to perform well at interview. But it ensures you get the chance. Check the job advert or contact HR to confirm." },
    { title: "SNIPEF and inclusion in plumbing", content: "SNIPEF has specific initiatives encouraging underrepresented groups — including women and those from ethnic minority backgrounds — to enter plumbing and heating. The sector has historically had very low diversity but employer attitudes are shifting.\n\nIf you are from a group that has historically been under-represented: your background is not a barrier. It may make your application stand out to employers who take inclusion seriously." },
    { title: "EDI questions at interview", content: "You may be asked how you would treat clients or colleagues with different needs. Show empathy and practicality:\n\n'I would adapt my communication to the person in front of me — speaking clearly, checking understanding, and using whatever support is available to ensure everyone gets equal service. I understand that people have different needs and that adjusting your approach is part of doing the job properly.'\n\nAvoid generalisations. Speak about behaviour and actions, not assumptions about groups." },
  ];
  return (
    <div>
      <SectionHeader icon="🤝" title="EDI and Your Rights" subtitle="Equality, inclusion and what you are legally entitled to during the recruitment process." />
      {items.map((item, i) => (
        <div key={i} style={{ background: "#fff", border: `1px solid ${open === i ? TEAL : "#E2E8F0"}`, borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden", marginBottom: 10 }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            style={{ width: "100%", background: "none", border: "none", padding: "13px 15px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: "inherit" }}>
            <span style={{ color: NAVY, fontWeight: 700, fontSize: 14, textAlign: "left" }}>{item.title}</span>
            <span style={{ color: TEAL, fontSize: 20, flexShrink: 0 }}>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && <div style={{ padding: "0 15px 15px", borderTop: "1px solid #E2E8F0" }}><p style={{ color: "#444", fontSize: 13, lineHeight: 1.75, margin: "12px 0 0", whiteSpace: "pre-line" }}>{item.content}</p></div>}
        </div>
      ))}
    </div>
  );
}

function CoachModule() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "I am your TASS Construction Coach.\n\nI can help you with:\n• Mock interview practice — tell me your trade and I will ask real questions\n• Feedback on your CV or personal statement\n• CITB HS&E test preparation\n• Building STAR answers from your real experiences\n• Trade-specific technical question prep\n• Handling nerves or blank moments\n\nWhat would you like to work on?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const PROMPTS = ["Run a mock interview for a carpentry apprenticeship", "Give feedback on my personal statement", "Help me build a STAR answer about safety", "Quiz me on CITB HS&E questions", "What technical questions for electrical?", "How do I answer why do you want this?"];

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMsgs = [...messages, { role: "user", content: userMsg }];
    setMessages(newMsgs);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-5-20250929",
          max_tokens: 1000,
          system: `You are the TASS Construction Apprenticeship Coach — a direct, experienced careers coach helping young people (16–29) in Scotland secure construction and trade apprenticeships.\n\nYour approach:\n- Direct and practical, not vague or generic\n- Evidence-focused — push candidates for specific examples, not claims\n- Familiar with all 8 Scottish construction trades: carpentry, bricklaying, plumbing (SNIPEF), electrical (SELECT), plastering, painting, roofing, plant operations\n- Knowledgeable about CITB HS&E test (50 questions, 90% pass), Modern Apprenticeship frameworks, Apprenticeships.Scot, MyJobScotland\n- Safety culture is central — always reinforce that construction employers prioritise attitude to safety above almost everything else\n\nWhen running mock interviews:\n- Ask one question at a time\n- After each answer, give specific feedback: what worked, what to improve, then show an improved version\n- Construction employers care about: safety awareness, reliability, attitude to instruction, genuine motivation\n\nKey principles:\n- STAR method for all competency answers\n- I not we — always\n- Safety culture is not about ticking boxes, it is about protecting everyone on site\n- Research the employer — generic applications fail\n\nKeep responses focused and mobile-friendly.`,
          messages: newMsgs.map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Connection issue — please try again.";
      setMessages([...newMsgs, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMsgs, { role: "assistant", content: "Connection issue — please try again." }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 180px)", minHeight: 480 }}>
      <div style={{ background: "#EFF6FF", borderLeft: `3px solid ${TEAL}`, borderRadius: 8, padding: "9px 13px", marginBottom: 10 }}>
        <p style={{ color: "#1A5276", fontSize: 13, margin: 0 }}>💡 Try a mock interview, get STAR feedback, or paste your personal statement for a review.</p>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 10, overflowX: "auto", paddingBottom: 4 }}>
        {PROMPTS.map((p, i) => <button key={i} onClick={() => setInput(p)} style={{ background: TEAL + "15", border: `1px solid ${TEAL}40`, color: TEAL, borderRadius: 99, padding: "5px 11px", whiteSpace: "nowrap", fontSize: 11, fontWeight: 600, cursor: "pointer", flexShrink: 0, fontFamily: "inherit" }}>{p}</button>)}
      </div>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingRight: 4, paddingBottom: 8 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "85%", padding: "10px 14px", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.role === "user" ? NAVY : "#fff", color: m.role === "user" ? "#fff" : NAVY, fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap", border: m.role === "assistant" ? "1px solid #E2E8F0" : "none", boxShadow: m.role === "assistant" ? "0 1px 4px rgba(0,0,0,0.06)" : "none" }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div style={{ display: "flex", justifyContent: "flex-start" }}><div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "14px 14px 14px 4px", padding: "11px 15px" }}><div style={{ display: "flex", gap: 4 }}>{[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, background: TEAL, borderRadius: 99, animation: `b 1.2s ${i*0.2}s infinite` }} />)}</div></div></div>}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="Ask your coach anything, or paste your statement or STAR answer for feedback..." rows={2} style={{ flex: 1, background: "#fff", border: "1px solid #E2E8F0", borderRadius: 10, padding: "10px 13px", color: NAVY, fontSize: 14, fontFamily: "inherit", resize: "none", minHeight: 50, boxSizing: "border-box" }} />
        <button onClick={send} disabled={loading || !input.trim()} style={{ background: input.trim() ? TEAL : "#E2E8F0", border: "none", color: input.trim() ? "#fff" : "#999", borderRadius: 10, padding: "0 16px", cursor: input.trim() ? "pointer" : "default", fontSize: 20 }}>↑</button>
      </div>
      <style>{`@keyframes b{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}`}</style>
    </div>
  );
}

function HomeModule({ setTab }) {
  const cards = [
    { id:"sector",      icon:"🔍", title:"Sector Overview",         desc:"What construction is, who recruits, and why it is a serious career" },
    { id:"pathways",    icon:"📋", title:"Apprenticeship Pathways",  desc:"All 8 trades — qualifications, duration, entry requirements" },
    { id:"apply",       icon:"📝", title:"How to Apply",            desc:"Step-by-step from research to submitted application" },
    { id:"cv",          icon:"📄", title:"CV Builder",              desc:"Weak vs strong examples across all four CV sections" },
    { id:"star",        icon:"⭐", title:"STAR Method",             desc:"4 worked examples — weak, good and strong answers" },
    { id:"interview",   icon:"🎤", title:"Interview Questions",      desc:"8 questions with strong/weak answers and coach tips" },
    { id:"technical",   icon:"🔧", title:"Trade Technical Qs",      desc:"All 8 trades — 5 multiple choice questions each" },
    { id:"citb",        icon:"🦺", title:"CITB HS&E Practice",      desc:"12 practice questions — same format as the real test" },
    { id:"casestudies", icon:"📚", title:"Real Journeys",           desc:"8 case studies — lessons from success and failure" },
    { id:"roadmap",     icon:"🗓️", title:"12-Week Roadmap",         desc:"Week-by-week preparation from research to offer" },
    { id:"edi",         icon:"🤝", title:"EDI and Your Rights",     desc:"Equality Act, adjustments, CITB accessibility" },
    { id:"coach",       icon:"🤖", title:"AI Coach",                desc:"Mock interviews, STAR feedback, CV review" },
  ];
  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, #0D1B3E 0%, #1A3060 100%)`, borderRadius: 14, padding: "32px 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <TASSLogo size="lg" theme="dark" />
        <a href="https://theapprenticeshipsuccesssystem.co.uk"
          style={{display:"flex",alignItems:"center",gap:6,textDecoration:"none",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:99,padding:"5px 14px"}}>
          <span style={{fontSize:12}}>🏠</span>
          <span style={{color:"rgba(255,255,255,0.8)",fontSize:11,fontWeight:700,letterSpacing:"0.05em"}}>All Modules</span>
        </a>
      </div>
      <div style={{ background: "#fff", border: `1px solid ${AMBER}30`, borderLeft: `4px solid ${AMBER}`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <p style={{ color: "#444", fontSize: 11, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 }}>Construction and Trades</p>
        <p style={{ color: NAVY, fontSize: 14, lineHeight: 1.65, margin: 0 }}>A full-depth preparation module for construction trade apprenticeships in Scotland. Covers all 8 trades, CITB test prep, STAR method, CV building, technical questions and real candidate stories.</p>
      </div>
      <div style={{ background: "#EFF6FF", border: `1px solid ${TEAL}30`, borderLeft: `4px solid ${TEAL}`, borderRadius: 10, padding: 14, marginBottom: 20 }}>
        <p style={{ color: TEAL, fontWeight: 800, fontSize: 12, margin: "0 0 4px", textTransform: "uppercase" }}>Start here</p>
        <p style={{ color: "#444", fontSize: 13, lineHeight: 1.65, margin: 0 }}>Read <strong style={{ color: NAVY }}>Sector Overview</strong> and <strong style={{ color: NAVY }}>Pathways</strong> first. Then build your CV and STAR answers. Use the AI Coach to practise at any stage.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
        {cards.map((card, i) => (
          <button key={i} onClick={() => setTab(card.id)}
            style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: "14px 12px", textAlign: "left", cursor: "pointer", fontFamily: "inherit" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = AMBER; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#E2E8F0"; }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{card.icon}</div>
            <p style={{ color: NAVY, fontWeight: 700, fontSize: 13, margin: "0 0 3px", lineHeight: 1.3 }}>{card.title}</p>
            <p style={{ color: "#444", fontSize: 11, lineHeight: 1.4, margin: 0 }}>{card.desc}</p>
          </button>
        ))}
      </div>
      <div style={{ textAlign: "center", padding: "4px 0 8px", color: "#444", fontSize: 11 }}>
        <strong style={{ color: TEAL }}>The Apprenticeship Success System™</strong> · tass.scot
      </div>
    </div>
  );
}

export default function TASSConstruction() {
  const [tab, setTab] = useState("home");
  const currentTab = MODULES.find(t => t.id === tab);
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#F0F4F8", minHeight: "100vh", color: NAVY }}>
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: ${CONCRETE}; } ::-webkit-scrollbar-thumb { background: #D1D9E6; border-radius: 4px; } textarea:focus, button:focus { outline: 2px solid ${AMBER}; outline-offset: 2px; }`}</style>
      {tab !== "home" && (
        <div style={{ background: `linear-gradient(135deg, #0D1B3E 0%, #1A3060 100%)`, borderBottom: "none", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 100 }}>
          <TASSLogo size="sm" theme="dark" />
          <div style={{ width: 1, height: 32, background: "#E2E8F0", margin: "0 4px" }} />
          <div style={{ flex: 1 }}>
            <div style={{ color: NAVY, fontWeight: 700, fontSize: 12, lineHeight: 1, textTransform: "uppercase", letterSpacing: 0.5 }}>Construction and Trades</div>
            <div style={{ color: "#444", fontSize: 11, marginTop: 2 }}>{currentTab?.icon} {currentTab?.label}</div>
          </div>
          <button onClick={()=>setTab("home")} style={{
            display:"flex",flexDirection:"column",alignItems:"center",gap:2,
            background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",
            borderRadius:8,padding:"5px 10px",cursor:"pointer",flexShrink:0,fontFamily:"inherit",
          }}>
            <span style={{fontSize:14}}>⬅️</span>
            <span style={{color:"rgba(255,255,255,0.8)",fontSize:8,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,whiteSpace:"nowrap"}}>Module</span>
          </button>
          <a href="https://theapprenticeshipsuccesssystem.co.uk" style={{
            display:"flex",flexDirection:"column",alignItems:"center",gap:2,
            textDecoration:"none",background:"rgba(255,255,255,0.1)",
            border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"5px 10px",flexShrink:0,
          }}>
            <span style={{fontSize:14}}>🏠</span>
            <span style={{color:"rgba(255,255,255,0.8)",fontSize:8,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,whiteSpace:"nowrap"}}>All Modules</span>
          </a>
        </div>
      )}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "20px 16px 110px" }}>
        {tab === "home"        && <HomeModule setTab={setTab} />}
        {tab === "sector"      && <SectorModule />}
        {tab === "pathways"    && <PathwaysModule />}
        {tab === "apply"       && <ApplyModule />}
        {tab === "cv"          && <CVModule />}
        {tab === "star"        && <STARModule />}
        {tab === "interview"   && <InterviewModule />}
        {tab === "technical"   && <TechnicalModule />}
        {tab === "citb"        && <CITBModule />}
        {tab === "casestudies" && <CaseStudiesModule />}
        {tab === "roadmap"     && <RoadmapModule />}
        {tab === "edi"         && <EDIModule />}
        {tab === "coach"       && <CoachModule />}
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #E2E8F0", boxShadow: "0 -2px 12px rgba(0,0,0,0.06)", display: "flex", justifyContent: "center", padding: "8px 2px 12px", gap: 1, zIndex: 100 }}>
        {MODULES.map(m => (
          <button key={m.id} onClick={() => setTab(m.id)}
            style={{ flex: 1, maxWidth: 58, background: "none", border: "none", cursor: "pointer", padding: "5px 2px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ fontSize: 14, filter: tab === m.id ? "none" : "grayscale(1) opacity(0.3)" }}>{m.icon}</div>
            <div style={{ fontSize: 7, color: tab === m.id ? AMBER : "#444", fontWeight: tab === m.id ? 800 : 400, textTransform: "uppercase", letterSpacing: "0.02em" }}>{m.label.substring(0, 5)}</div>
            {tab === m.id && <div style={{ width: 12, height: 2, background: AMBER, borderRadius: 2 }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
