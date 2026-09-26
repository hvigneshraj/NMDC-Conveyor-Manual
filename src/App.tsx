import { useState } from "react";

type Damage = {
  id: number;
  name: string;
  short: string;
  causes: string[];
  sensors: string[];
  why: string;
  alternative: string;
  nunar: string;
  checks: string[];
  spares: string[];
};

const damages: Damage[] = [
  {
    id: 1,
    name: "Surface / Cover Damage",
    short: "Progressive deterioration of the outer rubber cover.",
    causes: [
      "Abrasive material contact",
      "Continuous loading and friction",
      "Material carryback",
      "Harsh operating environment",
    ],
    sensors: ["RGB Line-Scan", "LWIR"],
    why: "RGB identifies visible cover deterioration while LWIR adds spatial thermal context.",
    alternative:
      "A point temperature sensor only observes one location and cannot provide full-width visual coverage.",
    nunar:
      "NUNAR correlates surface imagery with thermal evidence and repeated observations to understand condition progression.",
    checks: [
      "Inspect depth and spread of worn cover",
      "Check exposed reinforcement",
      "Inspect adjacent belt areas",
      "Look for recurring material contact zones",
    ],
    spares: [
      "Cover-rubber repair compound",
      "Wear-resistant rubber sheet",
      "Buffing / grinding kit",
      "Cold-cure repair compound",
    ],
  },
  {
    id: 2,
    name: "Cut / Gouge",
    short: "Localized deep surface damage caused by sharp or heavy material.",
    causes: [
      "Sharp ore or foreign objects",
      "Impact from heavy material",
      "Material trapped between belt and structure",
      "Improper loading conditions",
    ],
    sensors: ["RGB Line-Scan", "LWIR", "Encoder"],
    why: "RGB shows the geometry of the cut, LWIR provides thermal context, and the encoder provides belt position.",
    alternative:
      "A conventional area camera is less suited to continuous full-width moving-belt inspection.",
    nunar:
      "NUNAR aligns visible damage with belt position and supporting thermal evidence for repeatable assessment.",
    checks: [
      "Measure cut depth and length",
      "Check whether reinforcement is exposed",
      "Inspect surrounding cover",
      "Record belt position",
    ],
    spares: [
      "Cold-bonding repair kit",
      "Matching rubber patch",
      "Solvent / bonding adhesive",
      "Hand buffing tools",
    ],
  },
  {
    id: 3,
    name: "Puncture",
    short: "Localized penetration through the belt cover or structure.",
    causes: [
      "Sharp material impact",
      "Trapped foreign objects",
      "Falling large fragments",
      "Loading-zone impact",
    ],
    sensors: ["RGB Line-Scan", "LWIR", "Encoder"],
    why: "RGB identifies the puncture, LWIR supports anomaly assessment, and the encoder localizes the belt position.",
    alternative:
      "A point sensor cannot provide continuous spatial inspection of the moving belt.",
    nunar:
      "NUNAR combines location and surface evidence with repeated observations to support field verification.",
    checks: [
      "Inspect penetration depth",
      "Check for exposed steel cord",
      "Inspect both sides where accessible",
      "Check surrounding cover deformation",
    ],
    spares: [
      "Hot / cold vulcanized patch kit",
      "Filler compound",
      "Cover-rubber puncture patch",
    ],
  },
  {
    id: 4,
    name: "Edge Damage",
    short: "Deterioration, tearing or deformation along the belt edge.",
    causes: [
      "Belt misalignment",
      "Contact with structure",
      "Improper tracking",
      "Mechanical interference",
    ],
    sensors: ["RGB Line-Scan", "Encoder"],
    why: "RGB observes the belt edge continuously while encoder data provides position context.",
    alternative:
      "Internal sensing is not the primary method for visible edge geometry problems.",
    nunar:
      "NUNAR links repeated edge observations with position information to identify recurring damage locations.",
    checks: [
      "Inspect complete edge length",
      "Check contact marks",
      "Verify belt tracking",
      "Inspect nearby idlers and structure",
    ],
    spares: [
      "Rubber edge strip / edge guard",
      "Hot-vulcanizing edge repair kit",
      "Edge trimming tools",
    ],
  },
  {
    id: 5,
    name: "Crack / Delamination",
    short: "Surface cracking or separation within the belt cover structure.",
    causes: [
      "Repeated flexing",
      "Material fatigue",
      "Thermal effects",
      "Aging and environmental exposure",
    ],
    sensors: ["RGB Line-Scan", "LWIR"],
    why: "RGB detects visible cracking while LWIR can reveal abnormal thermal patterns associated with affected regions.",
    alternative:
      "A point temperature sensor cannot spatially map the affected belt area.",
    nunar:
      "NUNAR compares visual and thermal evidence across repeated observations to track condition changes.",
    checks: [
      "Inspect crack density",
      "Check crack depth",
      "Look for delaminated areas",
      "Inspect nearby belt sections",
    ],
    spares: [
      "Elastomeric sealant",
      "Resurfacing / recoating compound",
      "Portable vulcanizing press",
    ],
  },
  {
    id: 6,
    name: "Steel-Cord Damage",
    short: "Internal damage affecting the steel-cord reinforcement.",
    causes: [
      "Cord breakage",
      "Corrosion or degradation",
      "Moisture ingress",
      "Repeated mechanical loading",
    ],
    sensors: ["MFL / DMI", "AE", "Encoder"],
    why: "MFL / DMI provides internal steel-cord inspection while AE can indicate active structural events and encoder provides location.",
    alternative:
      "Vision primarily observes the external belt surface and cannot directly reveal hidden steel-cord damage.",
    nunar:
      "NUNAR combines internal magnetic evidence, acoustic events and belt position to support structural condition assessment.",
    checks: [
      "Verify reported belt position",
      "Inspect corresponding belt section",
      "Check exposed reinforcement if accessible",
      "Review previous observations at the same location",
    ],
    spares: [
      "Steel-cord splice repair kit",
      "Steel-cord replacement segments",
      "Hot splicing press",
      "Vulcanizing equipment",
    ],
  },
  {
    id: 7,
    name: "Longitudinal Rip",
    short: "A lengthwise tear running along the belt.",
    causes: [
      "Sharp foreign objects",
      "Material penetration",
      "Faulty transfer-zone conditions",
      "Existing puncture propagation",
    ],
    sensors: ["RGB Line-Scan", "AE", "Encoder"],
    why: "RGB identifies the visible rip, AE supports active-event detection, and encoder provides exact position.",
    alternative:
      "General vibration can be influenced by the complete conveyor system and is less localized to the damage event.",
    nunar:
      "NUNAR correlates surface evidence, acoustic activity and position to support rapid field verification.",
    checks: [
      "Measure rip length",
      "Inspect rip direction",
      "Check surrounding belt structure",
      "Inspect transfer and loading zones",
    ],
    spares: [
      "Mechanical rip-repair fasteners",
      "Cold-bond rip-repair kit",
      "Mobile vulcanizing unit",
      "Emergency rip-stop hardware",
    ],
  },
  {
    id: 8,
    name: "Transverse Tear",
    short: "A tear extending across the belt width.",
    causes: [
      "Impact loading",
      "Mechanical stress",
      "Existing cracks",
      "Material entrapment",
    ],
    sensors: ["RGB Line-Scan", "AE", "Encoder"],
    why: "RGB identifies tear geometry, AE supports structural-event detection, and encoder localizes the event.",
    alternative:
      "A single visual snapshot cannot provide continuous position-aware monitoring of a moving belt.",
    nunar:
      "NUNAR correlates visible tear evidence with acoustic activity and belt position for field assessment.",
    checks: [
      "Measure tear width",
      "Check reinforcement exposure",
      "Inspect nearby cover damage",
      "Verify belt tracking and loading conditions",
    ],
    spares: [
      "Transverse patch kit",
      "Cold-bond repair kit",
      "Mechanical fasteners / lacing",
    ],
  },
  {
    id: 9,
    name: "Splice Damage",
    short: "Deterioration, separation or structural degradation around a belt splice.",
    causes: [
      "Splice preparation quality",
      "Material-property differences",
      "Vulcanizing conditions",
      "Workmanship and alignment",
      "Environmental conditions",
    ],
    sensors: ["MFL / DMI", "RGB", "LWIR", "AE", "MCSA", "RFID + Encoder"],
    why: "Splices require multimodal inspection because surface geometry, internal reinforcement, thermal behaviour, acoustic events and operating context can all matter.",
    alternative:
      "No single sensor provides complete visibility into all splice-related failure mechanisms.",
    nunar:
      "NUNAR associates multimodal evidence with the same physical splice using RFID and belt position from the encoder.",
    checks: [
      "Inspect splice geometry",
      "Check surface separation",
      "Inspect thermal anomalies",
      "Verify splice identity and position",
      "Review previous observations",
    ],
    spares: [
      "Splice rubber compound",
      "Breaker fabric ply",
      "Bonding cement",
      "Curing press / heated platen",
      "Splice repair kit",
    ],
  },
  {
    id: 10,
    name: "Belt Rupture",
    short: "Major structural failure resulting in belt separation or loss of continuity.",
    causes: [
      "Progression of existing damage",
      "Severe impact",
      "Structural reinforcement failure",
      "Major splice failure",
      "Extreme operating conditions",
    ],
    sensors: ["RGB", "MFL / DMI", "LWIR", "AE", "MCSA", "RFID + Encoder"],
    why: "A major rupture can involve surface, internal, thermal, acoustic and operating evidence, so multiple modalities provide complementary context.",
    alternative:
      "A single sensor cannot provide complete visibility into a complex belt failure.",
    nunar:
      "NUNAR brings multiple evidence streams together to support condition assessment and maintenance preparation.",
    checks: [
      "Secure the affected conveyor",
      "Inspect rupture extent",
      "Inspect reinforcement",
      "Check splice and adjacent belt areas",
      "Verify mechanical cause",
    ],
    spares: [
      "Spare belt roll / segment",
      "Heavy-duty splicing press",
      "High-tension rubber and breaker fabric",
      "Rigging / lifting equipment",
      "Emergency backstop system check kit",
    ],
  },
];

const sensors = [
  {
    code: "01",
    name: "MFL / DMI",
    question: "Is there hidden internal steel-cord damage?",
    key: "Internal steel-cord inspection",
    alternative: "Vision sees the surface, not hidden steel-cord damage.",
  },
  {
    code: "02",
    name: "ACOUSTIC EMISSION",
    question: "Is active structural damage occurring?",
    key: "Localized transient damage events",
    alternative:
      "General vibration is influenced by conveyor and motor behaviour.",
  },
  {
    code: "03",
    name: "RGB LINE-SCAN",
    question: "What is happening on the belt surface?",
    key: "Continuous full-width inspection",
    alternative:
      "Line-scan is better suited to continuous moving-belt coverage.",
  },
  {
    code: "04",
    name: "LWIR",
    question: "Where are abnormal thermal patterns?",
    key: "Spatial thermal awareness",
    alternative: "Point sensors only measure one local location.",
  },
  {
    code: "05",
    name: "MCSA",
    question: "What operating behaviour is the drive showing?",
    key: "Electrical operating context",
    alternative:
      "Direct mechanical sensing can require more mechanical intervention.",
  },
  {
    code: "06",
    name: "RFID + ENCODER",
    question: "Which physical splice is being observed?",
    key: "Splice identity + belt position",
    alternative:
      "GPS does not provide precise splice-level identification inside the conveyor.",
  },
];

const matrix = [
  ["Surface / Cover", "—", "—", "●", "○", "—", "—", "○"],
  ["Cut / Gouge", "—", "—", "●", "○", "—", "—", "●"],
  ["Puncture", "—", "—", "●", "○", "—", "—", "●"],
  ["Edge Damage", "—", "—", "●", "—", "—", "—", "●"],
  ["Crack / Delamination", "—", "○", "●", "○", "—", "—", "—"],
  ["Steel-Cord Damage", "●", "●", "—", "○", "—", "—", "●"],
  ["Longitudinal Rip", "—", "○", "●", "—", "—", "—", "●"],
  ["Transverse Tear", "—", "○", "●", "—", "—", "—", "●"],
  ["Splice Damage", "●", "○", "●", "●", "○", "●", "●"],
  ["Belt Rupture", "●", "●", "●", "●", "●", "●", "●"],
];

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-title">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function App() {
  const [selectedDamage, setSelectedDamage] = useState<Damage | null>(null);
  const [activeSensor, setActiveSensor] = useState(0);

  return (
    <div className="app">
      <style>{`
        .brand {
          display:flex;
          align-items:center;
          gap:14px;
          min-width:290px;
          color:inherit;
          text-decoration:none;
        }

        .brand-nmdc {
          width:58px;
          height:58px;
          object-fit:contain;
          display:block;
        }

        .brand-mugizh {
          width:42px;
          height:42px;
          object-fit:contain;
          display:block;
          border-radius:8px;
        }

        .brand-divider {
          width:1px;
          height:34px;
          background:rgba(255,255,255,.16);
          display:block;
        }

        .brand-copy {
          display:flex;
          flex-direction:column;
          gap:5px;
        }

        .brand-copy strong {
          font-size:12px;
          letter-spacing:.14em;
          color:#eef3f4;
        }

        .brand-copy small {
          font-size:8px;
          letter-spacing:.13em;
          color:#718087;
        }

        .damage-visual { position: relative; overflow: hidden; }
        .damage-visual .visual-tag {
          position:absolute;
          left:16px;
          bottom:14px;
          z-index:4;
          font-size:9px;
          letter-spacing:.14em;
          color:rgba(255,255,255,.68);
        }

        .splice-visual {
          background:radial-gradient(circle at 50% 48%,rgba(51,153,51,.16),transparent 48%),linear-gradient(135deg,#071118,#0d1820);
        }

        .splice-belt {
          position:absolute;
          top:50%;
          width:45%;
          height:46px;
          transform:translateY(-50%) skewY(-4deg);
          background:repeating-linear-gradient(90deg,#202c33 0 18px,#111a20 18px 36px);
          border:1px solid rgba(255,255,255,.22);
        }

        .splice-belt-left { left:3%; }
        .splice-belt-right { right:3%; }

        .splice-joint {
          position:absolute;
          left:43%;
          top:31%;
          width:14%;
          height:38%;
          background:linear-gradient(90deg,rgba(51,153,51,.2),rgba(51,153,51,.8),rgba(51,153,51,.2));
          border:1px solid rgba(51,153,51,.8);
          box-shadow:0 0 22px rgba(51,153,51,.35);
          transform:skewY(-4deg);
          z-index:2;
        }

        .splice-bolt {
          position:absolute;
          width:7px;
          height:7px;
          border-radius:50%;
          background:#aeb9bd;
          box-shadow:0 0 8px rgba(255,255,255,.35);
          z-index:3;
        }

        .bolt-one { left:46%; top:38%; }
        .bolt-two { left:51%; top:48%; }
        .bolt-three { left:46%; top:58%; }

        .splice-scan-line {
          position:absolute;
          left:0;
          right:0;
          top:18%;
          height:1px;
          background:linear-gradient(90deg,transparent,#339933,transparent);
          box-shadow:0 0 12px rgba(51,153,51,.8);
          animation:spliceScan 3s linear infinite;
        }

        .rupture-visual {
          background:radial-gradient(circle at 50% 50%,rgba(190,45,45,.2),transparent 42%),linear-gradient(135deg,#10090b,#17151a);
        }

        .rupture-belt {
          position:absolute;
          top:50%;
          height:52px;
          transform:translateY(-50%) skewY(-5deg);
          background:repeating-linear-gradient(90deg,#202a30 0 20px,#10171c 20px 40px);
          border-top:1px solid rgba(255,255,255,.24);
          border-bottom:1px solid rgba(255,255,255,.16);
        }

        .rupture-left {
          left:-2%;
          width:46%;
          clip-path:polygon(0 0,100% 0,88% 25%,100% 50%,84% 72%,94% 100%,0 100%);
        }

        .rupture-right {
          right:-2%;
          width:46%;
          clip-path:polygon(6% 0,100% 0,100% 100%,4% 100%,16% 74%,3% 50%,18% 26%);
        }

        .rupture-gap {
          position:absolute;
          left:45%;
          top:22%;
          width:10%;
          height:56%;
          background:#030609;
          transform:skewY(-5deg);
          box-shadow:0 0 28px rgba(0,0,0,.8);
        }

        .rupture-crack {
          position:absolute;
          left:48%;
          top:29%;
          width:3px;
          height:43%;
          background:linear-gradient(#d94b4b,#5d1717);
          transform:rotate(17deg);
          box-shadow:0 0 12px rgba(217,75,75,.65);
          z-index:3;
        }

        .rupture-scan-line {
          position:absolute;
          left:0;
          right:0;
          bottom:20%;
          height:1px;
          background:linear-gradient(90deg,transparent,#d94b4b,transparent);
          box-shadow:0 0 12px rgba(217,75,75,.75);
        }

        .rupture-tag {
          color:rgba(255,150,150,.78)!important;
        }

        .research-hero-grid {
          display:grid;
          grid-template-columns:1.55fr .75fr;
          gap:18px;
          margin-bottom:22px;
        }

        .research-progress-card,
        .research-decision-card {
          border:1px solid rgba(255,255,255,.09);
          background:linear-gradient(145deg,rgba(13,25,33,.96),rgba(7,15,21,.96));
          padding:28px;
          position:relative;
          overflow:hidden;
        }

        .research-progress-card:after {
          content:"RESEARCH → DESIGN";
          position:absolute;
          right:-28px;
          bottom:18px;
          transform:rotate(-90deg);
          font-size:9px;
          letter-spacing:.2em;
          color:rgba(255,255,255,.08);
        }

        .research-card-topline {
          display:flex;
          justify-content:space-between;
          color:#7f9098;
          font-size:10px;
          letter-spacing:.15em;
        }

        .research-card-topline b {
          color:#339933;
          font-size:16px;
        }

        .research-progress-card h3 {
          font-size:clamp(24px,3vw,42px);
          line-height:.95;
          margin:24px 0 14px;
          max-width:680px;
        }

        .research-progress-card p {
          color:#9baab1;
          max-width:720px;
          line-height:1.7;
        }

        .research-scan-sequence {
          margin-top:25px;
          display:grid;
          gap:10px;
        }

        .research-scan-step {
          display:grid;
          grid-template-columns:45px 1fr;
          align-items:center;
          gap:12px;
        }

        .research-scan-step>span {
          color:#339933;
          font-size:11px;
        }

        .research-scan-step div {
          display:grid;
          grid-template-columns:90px 1fr;
          gap:14px;
          align-items:center;
        }

        .research-scan-step b {
          font-size:10px;
          letter-spacing:.13em;
          color:#dbe3e7;
        }

        .research-scan-step i {
          display:block;
          height:4px;
          background:linear-gradient(90deg,#339933,#000fa0);
          box-shadow:0 0 12px rgba(51,153,51,.18);
        }

        .research-decision-card>span {
          font-size:10px;
          letter-spacing:.16em;
          color:#7f9098;
        }

        .decision-row {
          display:grid;
          grid-template-columns:42px 1fr;
          gap:14px;
          align-items:start;
          margin-top:28px;
        }

        .decision-row>b {
          color:#339933;
          font-size:12px;
        }

        .decision-row strong {
          display:block;
          font-size:15px;
          letter-spacing:.08em;
        }

        .decision-row p {
          margin:5px 0 0;
          color:#7f9098;
          font-size:12px;
          line-height:1.5;
        }

        .decision-line {
          height:1px;
          background:rgba(255,255,255,.08);
          margin:18px 0 0 42px;
        }

        /* LOCKED RESEARCH REDIRECT STYLE */
        .research-link {
          display:inline-flex;
          align-items:center;
          justify-content:space-between;
          gap:18px;
          margin-top:22px;
          width:100%;
          padding-top:15px;
          border-top:1px solid rgba(255,255,255,.1);
          color:#dce6ea;
          text-decoration:none;
          font-size:10px;
          letter-spacing:.14em;
          font-weight:800;
          transition:.2s ease;
        }

        .research-link span {
          color:#339933;
          font-size:16px;
          transition:.2s ease;
        }

        .research-link:hover {
          color:#fff;
          border-color:rgba(51,153,51,.55);
        }

        .research-link:hover span {
          transform:translate(4px,-4px);
        }

        .research-card {
          display:flex;
          flex-direction:column;
        }

        .research-card .research-link {
          margin-top:auto;
        }

        /* ENGINEERING EVIDENCE */
        .engineering-evidence {
          margin:22px 0;
          padding:18px 20px;
          border:1px solid rgba(51,153,51,.28);
          background:linear-gradient(135deg,rgba(51,153,51,.07),rgba(4,12,17,.5));
          position:relative;
        }

        .engineering-evidence:before {
          content:"";
          position:absolute;
          left:0;
          top:0;
          bottom:0;
          width:2px;
          background:#339933;
        }

        .engineering-evidence label {
          color:#9be24b;
          font-size:9px;
          letter-spacing:.17em;
        }

        .engineering-evidence h4 {
          margin:9px 0 7px;
          font-size:14px;
          letter-spacing:.04em;
          color:#edf3f4;
        }

        .engineering-evidence p {
          color:#84939a;
          font-size:11px;
          line-height:1.65;
          margin:0;
        }

        .engineering-evidence a {
          display:inline-block;
          margin-top:12px;
          color:#dfe7e9;
          font-size:9px;
          letter-spacing:.12em;
          text-decoration:none;
          border-bottom:1px solid rgba(51,153,51,.45);
          padding-bottom:3px;
        }

        .engineering-evidence a:hover {
          color:#9be24b;
        }

        /* EVIDENCE MATRIX */
        .matrix-wrap {
          border:1px solid rgba(255,255,255,.1);
          background:linear-gradient(145deg,rgba(9,19,25,.96),rgba(4,10,14,.98));
          overflow:hidden;
        }

        .matrix-wrap table {
          width:100%;
          border-collapse:collapse;
          table-layout:fixed;
        }

        .matrix-wrap th {
          height:76px;
          padding:10px 8px;
          border-bottom:1px solid rgba(255,255,255,.1);
          border-right:1px solid rgba(255,255,255,.06);
          color:#7f9098;
          font-size:9px;
          letter-spacing:.12em;
          font-weight:800;
          vertical-align:middle;
        }

        .matrix-wrap th:first-child {
          width:220px;
          text-align:left;
          padding-left:22px;
          color:#cbd4d7;
        }

        .matrix-sensor-code {
          display:block;
          color:#9be24b;
          font-size:10px;
          margin-bottom:6px;
        }

        .matrix-sensor-name {
          display:block;
          color:#718087;
          font-size:8px;
          line-height:1.35;
          letter-spacing:.08em;
        }

        .matrix-wrap td {
          height:58px;
          border-bottom:1px solid rgba(255,255,255,.055);
          border-right:1px solid rgba(255,255,255,.05);
          text-align:center;
          color:#3d494e;
          font-size:15px;
        }

        .matrix-wrap td:first-child {
          text-align:left;
          padding-left:22px;
          color:#cbd3d6;
          font-size:11px;
          letter-spacing:.02em;
        }

        .matrix-wrap tr:hover td {
          background:rgba(255,255,255,.018);
        }

        .matrix-wrap tr:last-child td {
          border-bottom:0;
        }

        .matrix-wrap th:last-child,
        .matrix-wrap td:last-child {
          border-right:0;
        }

        .primary-cell {
          background:rgba(51,153,51,.055);
        }

        .support-cell {
          background:rgba(255,255,255,.018);
        }

        .evidence-bar {
          display:inline-block;
          font-size:13px;
          letter-spacing:-.09em;
          line-height:1;
        }

        .evidence-bar.direct {
          color:#9be24b;
          text-shadow:0 0 12px rgba(155,226,75,.35);
        }

        .evidence-bar.supporting {
          color:#a9b4b8;
        }

        .evidence-bar.none {
          color:#39454a;
          font-size:18px;
        }

        .matrix-legend {
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:18px;
          padding:17px 22px;
          border-top:1px solid rgba(255,255,255,.08);
          background:rgba(255,255,255,.015);
        }

        .matrix-legend-title {
          color:#6d7c82;
          font-size:8px;
          letter-spacing:.16em;
        }

        .matrix-legend-items {
          display:flex;
          gap:22px;
          flex-wrap:wrap;
        }

        .matrix-legend-item {
          display:flex;
          align-items:center;
          gap:8px;
          color:#8d9aa0;
          font-size:9px;
          letter-spacing:.08em;
        }

        .matrix-legend-item b {
          font-size:12px;
          letter-spacing:-.1em;
        }

        .matrix-legend-item.direct b {
          color:#9be24b;
        }

        .matrix-legend-item.support b {
          color:#a9b4b8;
        }

        .matrix-legend-item.none b {
          color:#39454a;
          font-size:17px;
        }

        @keyframes spliceScan {
          0% { top:18%; }
          50% { top:78%; }
          100% { top:18%; }
        }

        @media(max-width:850px) {
          .research-hero-grid {
            grid-template-columns:1fr;
          }

          .research-scan-step div {
            grid-template-columns:75px 1fr;
          }

          .research-progress-card,
          .research-decision-card {
            padding:22px;
          }

          .matrix-wrap {
            overflow-x:auto;
          }

          .matrix-wrap table {
            min-width:850px;
          }
        }

        @media(max-width:620px) {
          .brand {
            min-width:0;
            gap:8px;
          }

          .brand-nmdc {
            width:42px;
            height:42px;
          }

          .brand-mugizh {
            width:32px;
            height:32px;
          }

          .brand-copy strong {
            font-size:9px;
          }

          .brand-copy small {
            font-size:6px;
          }
        }
      `}</style>

      <style>{`
        .field-heading {
          display:grid;
          grid-template-columns:minmax(0,1fr) 300px;
          gap:34px;
          align-items:end;
          margin-bottom:48px;
        }

        .field-principle {
          border-left:2px solid #339933;
          padding:4px 0 4px 22px;
          margin-bottom:6px;
        }

        .field-principle span,
        .field-bottom-strip span {
          display:block;
          font-size:9px;
          letter-spacing:.18em;
          color:#6f8088;
          margin-bottom:10px;
        }

        .field-principle strong {
          display:block;
          font-size:14px;
          letter-spacing:.08em;
          color:#edf2f3;
        }

        .field-principle p {
          font-size:11px;
          line-height:1.6;
          color:#7e8d94;
          margin:9px 0 0;
        }

        .field-rail {
          position:relative;
          display:grid;
          grid-template-columns:repeat(6,1fr);
          border-top:1px solid rgba(255,255,255,.11);
          border-bottom:1px solid rgba(255,255,255,.08);
        }

        .field-rail-line {
          position:absolute;
          left:8%;
          right:8%;
          top:42px;
          height:1px;
          background:linear-gradient(90deg,#339933,rgba(51,153,51,.18));
          box-shadow:0 0 15px rgba(51,153,51,.18);
        }

        .field-node {
          position:relative;
          min-height:285px;
          padding:25px 24px 28px;
          border-right:1px solid rgba(255,255,255,.08);
          background:linear-gradient(180deg,rgba(12,23,29,.34),rgba(5,12,16,.08));
          transition:.25s ease;
        }

        .field-node:last-child {
          border-right:0;
        }

        .field-node:hover {
          background:linear-gradient(180deg,rgba(51,153,51,.08),rgba(5,12,16,.02));
          transform:translateY(-4px);
        }

        .field-node-top {
          display:flex;
          justify-content:space-between;
          align-items:center;
          position:relative;
          z-index:2;
        }

        .field-node-top span {
          font-size:11px;
          color:#9be24b;
          font-weight:800;
          letter-spacing:.08em;
        }

        .field-node-top i {
          width:9px;
          height:9px;
          border-radius:50%;
          background:#27322e;
          border:1px solid rgba(255,255,255,.12);
          box-shadow:0 0 0 5px rgba(51,153,51,.02);
        }

        .field-node:first-of-type .field-node-top i {
          background:#339933;
          box-shadow:0 0 16px rgba(51,153,51,.55);
        }

        .field-node small {
          display:block;
          margin-top:58px;
          color:#68777e;
          font-size:8px;
          letter-spacing:.16em;
        }

        .field-node h3 {
          font-size:22px;
          letter-spacing:-.02em;
          margin:12px 0 9px;
          color:#eef2f2;
        }

        .field-node p {
          font-size:11px;
          line-height:1.65;
          color:#829198;
          max-width:170px;
        }

        .field-bottom-strip {
          display:grid;
          grid-template-columns:1fr 30px 1fr 30px 1fr;
          align-items:center;
          margin-top:20px;
          padding:18px 22px;
          border:1px solid rgba(255,255,255,.08);
          background:rgba(7,15,20,.55);
        }

        .field-bottom-strip b {
          font-size:11px;
          letter-spacing:.08em;
          color:#dbe2e4;
        }

        .field-bottom-strip>i {
          height:1px;
          background:rgba(51,153,51,.45);
          position:relative;
        }

        .field-bottom-strip>i:after {
          content:'›';
          position:absolute;
          right:-2px;
          top:-10px;
          color:#339933;
          font-size:18px;
        }

        .readiness {
          display:grid!important;
          grid-template-columns:310px 1fr;
          gap:64px;
          align-items:center;
        }

        .readiness-intro>span {
          font-size:10px;
          letter-spacing:.17em;
          color:#9be24b;
        }

        .readiness-intro h2 {
          font-size:clamp(54px,6vw,96px);
          line-height:.82;
          letter-spacing:-.065em;
          margin:28px 0 26px;
          color:#f1f4f4;
        }

        .readiness-intro p {
          font-size:12px;
          line-height:1.7;
          color:#819097;
          max-width:285px;
        }

        .readiness-stamp {
          display:flex;
          align-items:center;
          gap:12px;
          margin-top:28px;
          padding-top:17px;
          border-top:1px solid rgba(255,255,255,.08);
        }

        .readiness-stamp b {
          font-size:11px;
          letter-spacing:.13em;
          color:#fff;
        }

        .readiness-stamp span {
          font-size:8px;
          letter-spacing:.13em;
          color:#68777e;
        }

        .readiness-grid {
          display:grid;
          grid-template-columns:repeat(2,1fr);
          gap:12px;
        }

        .readiness-card {
          min-height:205px;
          padding:24px;
          border:1px solid rgba(255,255,255,.09);
          background:linear-gradient(145deg,rgba(12,23,29,.78),rgba(5,12,16,.72));
          position:relative;
          overflow:hidden;
          transition:.25s ease;
        }

        .readiness-card:hover {
          border-color:rgba(51,153,51,.45);
          transform:translateY(-3px);
        }

        .readiness-card-number {
          font-size:11px;
          color:#9be24b;
          font-weight:800;
        }

        .readiness-card-tag {
          position:absolute;
          right:20px;
          top:24px;
          font-size:8px;
          letter-spacing:.15em;
          color:#5f7077;
        }

        .readiness-card h3 {
          font-size:16px;
          letter-spacing:.03em;
          margin:48px 0 10px;
          color:#e9eeee;
        }

        .readiness-card p {
          font-size:11px;
          line-height:1.65;
          color:#7e8d94;
          max-width:260px;
        }

        .readiness-card-line {
          position:absolute;
          left:24px;
          right:24px;
          bottom:22px;
          height:2px;
          background:rgba(255,255,255,.06);
          overflow:hidden;
        }

        .readiness-card-line i {
          display:block;
          width:38%;
          height:100%;
          background:#339933;
          box-shadow:0 0 12px rgba(51,153,51,.5);
        }

        @media(max-width:950px) {
          .field-heading {
            grid-template-columns:1fr;
          }

          .field-rail {
            grid-template-columns:repeat(3,1fr);
          }

          .field-rail-line {
            display:none;
          }

          .field-node:nth-child(3) {
            border-right:0;
          }

          .field-bottom-strip {
            grid-template-columns:1fr;
            gap:14px;
          }

          .field-bottom-strip>i {
            display:none;
          }

          .readiness {
            grid-template-columns:1fr!important;
          }

          .readiness-grid {
            grid-template-columns:1fr 1fr;
          }
        }

        @media(max-width:620px) {
          .field-rail {
            grid-template-columns:1fr;
          }

          .field-node {
            border-right:0;
            border-bottom:1px solid rgba(255,255,255,.08);
          }

          .readiness-grid {
            grid-template-columns:1fr;
          }

          .readiness-intro h2 {
            font-size:58px;
          }
        }
      `}</style>

      <nav className="nav">
        <a className="brand" href="#top">
          <img
            className="brand-nmdc"
            src="/images/NMDC%20logo.jpeg"
            alt="NMDC"
          />

          <span className="brand-divider" />

          <img
            className="brand-mugizh"
            src="/images/Mugizh-logo.png"
            alt="Mugizh"
          />


          <div className="brand-copy">
            <strong>CONVEYOR MANUAL</strong>
            <small>NUNAR / CONDITION ASSESSMENT</small>
          </div>
        </a>

        <div className="nav-links">
          <a href="#context">Context</a>
          <a href="#damage">Damage</a>
          <a href="#sensors">Sensors</a>
          <a href="#evidence">Evidence</a>
          <a href="#nunar">NUNAR</a>
          <a href="#research">Research</a>
          <a href="#field">Field Action</a>
        </div>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="hero-grid" />

          <div className="hero-content">
            <div className="hero-kicker">
              <i />
              ENGINEERING FIELD MANUAL
            </div>

            <h1>
              CONVEYOR BELT
              <br />
              <em>DAMAGE & FAILURE</em>
            </h1>

            <p>
              From visible damage to intelligent condition assessment.
              A research-driven engineering field guide for detecting,
              understanding, tracking and responding to belt damage.
            </p>

            <div className="hero-actions">
              <a href="#damage" className="button primary">
                EXPLORE DAMAGE <b>↓</b>
              </a>

              <a href="#nunar" className="button ghost">
                HOW NUNAR WORKS
              </a>
            </div>

            <div className="hero-meta">
              <div>
                <b>10</b>
                <span>DAMAGE MODES</span>
              </div>

              <div>
                <b>06</b>
                <span>SENSOR FAMILIES</span>
              </div>

              <div>
                <b>01</b>
                <span>EVIDENCE CHAIN</span>
              </div>
            </div>
          </div>

          <div className="hero-machine">
            <div className="machine-label">CONTINUOUS INSPECTION</div>

            <div className="belt">
              <div className="belt-pattern" />
              <div className="belt-scan" />
              <div className="belt-particle p1" />
              <div className="belt-particle p2" />
              <div className="belt-particle p3" />
            </div>

            <div className="machine-base">
              <span />
              <span />
              <span />
            </div>

            <div className="machine-readout">
              <small>INSPECTION MODE</small>
              <strong>MULTIMODAL</strong>
            </div>
          </div>
        </section>

        <section className="context section" id="context">
          <SectionTitle
            eyebrow="01 / OPERATING CONTEXT"
            title="UNDERSTANDING THE NMDC CONTEXT"
            text="Conveyor reliability sits inside a larger mining and material-handling environment. The manual starts with that physical context before moving into sensing."
          />

          <div className="context-grid">
            <article className="image-card large">
              <img
                src="/images/Operations%20map.jpeg"
                alt="NMDC operations map"
              />

              <div className="image-caption">
                <span>OPERATIONS CONTEXT</span>
                <strong>From mining footprint to conveyor reliability</strong>
              </div>
            </article>

            <article className="image-card">
              <img
                src="/images/Mining%20leases.jpeg"
                alt="NMDC mining leases"
              />

              <div className="image-caption">
                <span>MINING FOOTPRINT</span>
                <strong>
                  Reliability begins with understanding the environment
                </strong>
              </div>
            </article>
          </div>
        </section>

        <section className="failure section">
          <div className="failure-copy">
            <SectionTitle
              eyebrow="02 / FAILURE-FIRST DESIGN"
              title="WE STARTED WITH THE FAILURE, NOT WITH THE SENSOR."
              text="Different failure mechanisms appear at different physical layers. That is why NUNAR uses complementary sensing instead of asking one sensor to answer every question."
            />

            <div className="layer-list">
              {[
                "SURFACE",
                "RUBBER / COVER",
                "STEEL CORD",
                "SPLICE",
                "OPERATING CONTEXT",
              ].map((layer, i) => (
                <div className="layer" key={layer}>
                  <b>0{i + 1}</b>
                  <span>{layer}</span>
                  <i />
                </div>
              ))}
            </div>
          </div>

          <div className="belt-stack">
            <div className="stack-scan" />
            <div className="stack-layer surface">SURFACE</div>
            <div className="stack-layer rubber">RUBBER / COVER</div>
            <div className="stack-layer cord">STEEL CORD</div>
            <div className="stack-layer splice">SPLICE</div>
            <div className="stack-layer context-layer">
              OPERATING CONTEXT
            </div>
          </div>
        </section>

        <section className="damage section" id="damage">
          <SectionTitle
            eyebrow="03 / DAMAGE LIBRARY"
            title="READ THE FAILURE BEFORE READING THE SENSOR"
            text="Select a damage mode to move from visual recognition to causes, evidence, field checks and maintenance readiness."
          />

          <div className="damage-grid">
            {damages.map((damage) => (
              <button
                className="damage-card"
                key={damage.id}
                onClick={() => setSelectedDamage(damage)}
              >
                <div className="damage-number">
                  {String(damage.id).padStart(2, "0")}
                </div>

                <div
                  className={`damage-visual ${damage.id === 9
                    ? "splice-visual"
                    : damage.id === 10
                      ? "rupture-visual"
                      : ""
                    }`}
                  aria-hidden="true"
                >
                  {damage.id === 9 ? (
                    <>
                      <div className="splice-belt splice-belt-left" />
                      <div className="splice-belt splice-belt-right" />
                      <div className="splice-joint" />
                      <div className="splice-bolt bolt-one" />
                      <div className="splice-bolt bolt-two" />
                      <div className="splice-bolt bolt-three" />
                      <div className="splice-scan-line" />
                      <span className="visual-tag">
                        JOINT / SPLICE ZONE
                      </span>
                    </>
                  ) : damage.id === 10 ? (
                    <>
                      <div className="rupture-belt rupture-left" />
                      <div className="rupture-belt rupture-right" />
                      <div className="rupture-gap" />
                      <div className="rupture-crack" />
                      <div className="rupture-scan-line" />
                      <span className="visual-tag rupture-tag">
                        CRITICAL / CONTINUITY LOST
                      </span>
                    </>
                  ) : (
                    <>
                      <div className={`damage-mark mark-${damage.id}`} />
                      <div className="visual-scan" />
                    </>
                  )}
                </div>

                <div className="damage-info">
                  <span>FAILURE MODE</span>
                  <h3>{damage.name}</h3>
                  <p>{damage.short}</p>
                  <strong>OPEN FIELD VIEW →</strong>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="sensors section" id="sensors">
          <SectionTitle
            eyebrow="04 / SENSOR INTELLIGENCE"
            title="WHY THESE SENSORS?"
            text="Every sensor answers a different engineering question."
          />

          <div className="sensor-layout">
            <div className="sensor-visual">
              <div className="sensor-ring ring-one" />
              <div className="sensor-ring ring-two" />

              <div className="sensor-core">
                <span>QUESTION</span>
                <strong>{sensors[activeSensor].code}</strong>
              </div>

              <div className="orbit-dot dot-one" />
              <div className="orbit-dot dot-two" />
              <div className="orbit-dot dot-three" />
            </div>

            <div className="sensor-content">
              <div className="sensor-tabs">
                {sensors.map((sensor, index) => (
                  <button
                    className={index === activeSensor ? "active" : ""}
                    onClick={() => setActiveSensor(index)}
                    key={sensor.code}
                  >
                    {sensor.code}
                  </button>
                ))}
              </div>

              <div className="sensor-detail">
                <span>QUESTION THIS SENSOR ANSWERS</span>
                <h3>{sensors[activeSensor].name}</h3>
                <h4>{sensors[activeSensor].question}</h4>

                <div className="sensor-key">
                  <b>WHY THIS?</b>
                  <span>{sensors[activeSensor].key}</span>
                </div>

                <div className="sensor-alt">
                  <b>WHY NOT THE ALTERNATIVE?</b>
                  <span>{sensors[activeSensor].alternative}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="matrix section" id="evidence">
          <SectionTitle
            eyebrow="05 / EVIDENCE COVERAGE"
            title="SENSOR ↔ DAMAGE EVIDENCE MAP"
            text="Each sensor observes a different physical signature of belt degradation."
          />

          <div className="matrix-wrap">
            <table>
              <thead>
                <tr>
                  <th>DAMAGE</th>

                  <th>
                    <span className="matrix-sensor-code">MFL</span>
                    <span className="matrix-sensor-name">
                      INTERNAL
                    </span>
                  </th>

                  <th>
                    <span className="matrix-sensor-code">AE</span>
                    <span className="matrix-sensor-name">
                      ACTIVE EVENT
                    </span>
                  </th>

                  <th>
                    <span className="matrix-sensor-code">RGB</span>
                    <span className="matrix-sensor-name">
                      SURFACE
                    </span>
                  </th>

                  <th>
                    <span className="matrix-sensor-code">LWIR</span>
                    <span className="matrix-sensor-name">
                      THERMAL
                    </span>
                  </th>

                  <th>
                    <span className="matrix-sensor-code">MCSA</span>
                    <span className="matrix-sensor-name">
                      OPERATING
                    </span>
                  </th>

                  <th>
                    <span className="matrix-sensor-code">RFID</span>
                    <span className="matrix-sensor-name">
                      IDENTITY
                    </span>
                  </th>

                  <th>
                    <span className="matrix-sensor-code">ENC.</span>
                    <span className="matrix-sensor-name">
                      POSITION
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {matrix.map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>

                    {row.slice(1).map((value, i) => (
                      <td
                        className={
                          value === "●"
                            ? "primary-cell"
                            : value === "○"
                              ? "support-cell"
                              : "none-cell"
                        }
                        key={`${row[0]}-${i}`}
                      >
                        {value === "●" ? (
                          <b className="evidence-bar direct">███</b>
                        ) : value === "○" ? (
                          <b className="evidence-bar supporting">
                            ██
                          </b>
                        ) : (
                          <b className="evidence-bar none">·</b>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="matrix-legend">
              <span className="matrix-legend-title">
                EVIDENCE STRENGTH
              </span>

              <div className="matrix-legend-items">
                <span className="matrix-legend-item direct">
                  <b>███</b>
                  Direct Evidence
                </span>

                <span className="matrix-legend-item support">
                  <b>██</b>
                  Supporting Evidence
                </span>

                <span className="matrix-legend-item none">
                  <b>·</b>
                  No Direct Signal
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="nunar section" id="nunar">
          <div className="nunar-header">
            <span>06 / INTELLIGENT ASSESSMENT</span>

            <h2>
              NUNAR
              <br />
              <em>FROM SIGNALS TO DECISION</em>
            </h2>
          </div>

          <div className="fusion">
            <div className="fusion-inputs">
              {[
                "RGB",
                "MFL / DMI",
                "AE",
                "LWIR",
                "MCSA",
                "RFID",
                "ENCODER",
              ].map((item) => (
                <div className="fusion-input" key={item}>
                  <span>{item}</span>
                  <i />
                </div>
              ))}
            </div>

            <div className="fusion-node">
              <div className="fusion-pulse" />
              <span>NUNAR</span>
              <small>EVIDENCE FUSION</small>
            </div>

            <div className="fusion-output">
              <div>
                <span>01</span>
                <b>CONDITION</b>
              </div>

              <div>
                <span>02</span>
                <b>PROGRESSION</b>
              </div>

              <div>
                <span>03</span>
                <b>FIELD ACTION</b>
              </div>
            </div>
          </div>

          <div className="evidence-chain">
            {[
              [
                "01",
                "DETECT",
                "Sensor evidence identifies an abnormality.",
              ],
              [
                "02",
                "CORRELATE",
                "Multiple sensing modalities are compared.",
              ],
              [
                "03",
                "TRACK",
                "Position, splice identity and repeated observations are connected.",
              ],
              [
                "04",
                "ASSESS",
                "Condition and damage progression are interpreted.",
              ],
              [
                "05",
                "ACT",
                "The result supports inspection and maintenance planning.",
              ],
            ].map(([num, title, desc]) => (
              <div className="chain-step" key={num}>
                <span>{num}</span>

                <div>
                  <b>{title}</b>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RESEARCH SECTION — LINKS PRESERVED */}
        <section className="research section" id="research">
          <SectionTitle
            eyebrow="07 / RESEARCH SIGNAL"
            title="THE RESEARCH BEHIND THE DESIGN"
            text="NUNAR starts from documented engineering findings: damage is not only a point-in-time defect. Repeated observations, defect characteristics and failure mechanisms provide the basis for condition tracking."
          />

          <div className="research-hero-grid">
            <div className="research-progress-card">
              <div className="research-card-topline">
                <span>FIELD RESEARCH → DESIGN DECISION</span>
                <b>01</b>
              </div>

              <h3>WHY TRACK DAMAGE OVER TIME?</h3>

              <p>
                Repeated diagnostic observations can reveal how defect count,
                defect area and damage indicators change. That supports a shift
                from simply detecting damage to understanding its progression.
              </p>

              <div className="research-scan-sequence">
                {["BASELINE", "REPEAT", "COMPARE", "ASSESS"].map(
                  (label, i) => (
                    <div className="research-scan-step" key={label}>
                      <span>{String(i + 1).padStart(2, "0")}</span>

                      <div>
                        <b>{label}</b>
                        <i style={{ width: `${30 + i * 18}%` }} />
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="concept-note">
                <span>ENGINEERING NOTE</span>
                <strong>
                  CONCEPTUAL PROGRESSION — NOT LIVE DATA
                </strong>
              </div>
            </div>

            <div className="research-decision-card">
              <span>WHAT THE RESEARCH CHANGED</span>

              <div className="decision-row">
                <b>01</b>
                <div>
                  <strong>DETECT</strong>
                  <p>Find the abnormality.</p>
                </div>
              </div>

              <div className="decision-line" />

              <div className="decision-row">
                <b>02</b>
                <div>
                  <strong>TRACK</strong>
                  <p>Compare repeated observations.</p>
                </div>
              </div>

              <div className="decision-line" />

              <div className="decision-row">
                <b>03</b>
                <div>
                  <strong>PREPARE</strong>
                  <p>Turn evidence into field action.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="research-grid">
            <article className="research-card">
              <div className="research-card-index">01</div>
              <span className="research-card-type">
                STEEL-CORD DAMAGE / PROGRESSION
              </span>

              <h3>
                Repeated diagnostic scans can reveal damage development
              </h3>

              <p>
                Research on repeated magnetic diagnostic measurements shows why
                defect count, defect area and their change over time matter for
                condition assessment.
              </p>

              <div className="research-decision">
                <span>DESIGN DECISION</span>
                <strong>
                  Keep historical observations, not just the latest scan.
                </strong>
              </div>

              {/* EXISTING REDIRECT — UNCHANGED */}
              <a
                className="research-link"
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8196153/"
                target="_blank"
                rel="noopener noreferrer"
              >
                READ ORIGINAL PAPER <span>↗</span>
              </a>
            </article>

            <article className="research-card">
              <div className="research-card-index">02</div>
              <span className="research-card-type">
                DIAGNOSTIC TREND / DEFECT AREA
              </span>

              <h3>
                Damage area can matter alongside defect count
              </h3>

              <p>
                DiagBelt research reported changes in both the number of defects
                and their total affected area during repeated observations of a
                steel-cord belt.
              </p>

              <div className="research-decision">
                <span>DESIGN DECISION</span>
                <strong>
                  Track more than a simple defect counter.
                </strong>
              </div>

              {/* EXISTING REDIRECT — UNCHANGED */}
              <a
                className="research-link"
                href="https://diagbeltplus.pwr.edu.pl/core-damage-increase-assessment-in-the-conveyor-belt-with-steel-cords/"
                target="_blank"
                rel="noopener noreferrer"
              >
                READ DIAGBELT RESEARCH <span>↗</span>
              </a>
            </article>

            <article className="research-card">
              <div className="research-card-index">03</div>
              <span className="research-card-type">
                FAILURE CLASSIFICATION
              </span>

              <h3>
                Different damage mechanisms need different monitoring
              </h3>

              <p>
                A review of conveyor-belt damage classifies failure types and
                discusses matching prevention and condition-monitoring methods to
                the operating problem.
              </p>

              <div className="research-decision">
                <span>DESIGN DECISION</span>
                <strong>
                  Start with the failure mechanism, then choose evidence.
                </strong>
              </div>

              {/* EXISTING REDIRECT — UNCHANGED */}
              <a
                className="research-link"
                href="https://doi.org/10.1016/j.engfailanal.2022.106520"
                target="_blank"
                rel="noopener noreferrer"
              >
                READ REVIEW PAPER <span>↗</span>
              </a>
            </article>

            <article className="research-card">
              <div className="research-card-index">04</div>
              <span className="research-card-type">
                SPLICE RELIABILITY
              </span>

              <h3>
                Splice quality depends on preparation and material factors
              </h3>

              <p>
                Experimental work on conveyor-belt splices identified improper
                preparation of spliced surfaces and differences in mechanical
                properties as contributors to reduced splice strength.
              </p>

              <div className="research-decision">
                <span>DESIGN DECISION</span>
                <strong>
                  Make splice evidence and field verification explicit.
                </strong>
              </div>

              {/* EXISTING REDIRECT — UNCHANGED */}
              <a
                className="research-link"
                href="https://www.mdpi.com/1996-1073/14/5/1512"
                target="_blank"
                rel="noopener noreferrer"
              >
                READ SPLICE PAPER <span>↗</span>
              </a>
            </article>
          </div>
        </section>

        <section className="field section" id="field">
          <div className="field-heading">
            <SectionTitle
              eyebrow="08 / FIELD RESPONSE"
              title="FROM DETECTION TO FIELD ACTION"
              text="The system supports the engineer; it does not replace the engineer's inspection and maintenance decision."
            />

            <div className="field-principle">
              <span>FIELD PRINCIPLE</span>
              <strong>AI ADVISES. ENGINEER VERIFIES.</strong>
              <p>
                No automated repair command. No safety-trip decision through
                the AI layer.
              </p>
            </div>
          </div>

          <div className="field-rail">
            <div className="field-rail-line" />

            {[
              ["01", "ALERT", "An abnormality is surfaced.", "SENSOR EVIDENCE"],
              ["02", "VERIFY", "Evidence is reviewed.", "MULTIMODAL CHECK"],
              ["03", "INSPECT", "The physical belt is checked.", "FIELD CONFIRMATION"],
              ["04", "PLAN", "Repair and downtime are considered.", "ENGINEER DECISION"],
              ["05", "REPAIR", "Maintenance action is performed.", "CONTROLLED ACTION"],
              ["06", "RECORD", "The outcome becomes future evidence.", "LEARNING LOOP"],
            ].map(([num, title, desc, tag]) => (
              <article className="field-node" key={num}>
                <div className="field-node-top">
                  <span>{num}</span>
                  <i />
                </div>

                <small>{tag}</small>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>

          <div className="field-bottom-strip">
            <div>
              <span>INPUT</span>
              <b>Sensor evidence</b>
            </div>

            <i />

            <div>
              <span>HUMAN GATE</span>
              <b>Engineer verification</b>
            </div>

            <i />

            <div>
              <span>OUTPUT</span>
              <b>Maintenance action</b>
            </div>
          </div>
        </section>

        <section className="readiness section">
          <div className="readiness-intro">
            <span>09 / MAINTENANCE READINESS</span>

            <h2>
              DETECT.
              <br />
              PREPARE.
              <br />
              REPAIR.
            </h2>

            <p>
              Detection only creates value when the maintenance team can turn
              the finding into a prepared, verifiable intervention.
            </p>

            <div className="readiness-stamp">
              <b>NUNAR</b>
              <span>DECISION SUPPORT LAYER</span>
            </div>
          </div>

          <div className="readiness-grid">
            {[
              [
                "01",
                "DAMAGE DETECTED",
                "Identify the failure mode and affected belt location.",
                "EVIDENCE",
              ],
              [
                "02",
                "REPAIR REQUIREMENT",
                "Translate the observed condition into a field repair need.",
                "METHOD",
              ],
              [
                "03",
                "SPARES / MATERIALS",
                "Surface the materials and repair equipment required for preparation.",
                "READINESS",
              ],
              [
                "04",
                "MAINTENANCE PREPARATION",
                "Plan inspection, access, downtime and authorized intervention.",
                "EXECUTION",
              ],
            ].map(([num, title, desc, tag]) => (
              <article className="readiness-card" key={num}>
                <div className="readiness-card-number">{num}</div>
                <div className="readiness-card-tag">{tag}</div>
                <h3>{title}</h3>
                <p>{desc}</p>

                <div className="readiness-card-line">
                  <i />
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div>
          <strong>NMDC</strong>
          <span>CONVEYOR BELT DAMAGE & FAILURE MANUAL</span>
        </div>

        <div>
          <strong>NUNAR</strong>
          <span>INTELLIGENT CONDITION ASSESSMENT LAYER</span>
        </div>
      </footer>

      {selectedDamage && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedDamage(null)}
        >
          <div
            className="damage-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-modal"
              onClick={() => setSelectedDamage(null)}
            >
              ×
            </button>

            <div className="modal-top">
              <span>
                {String(selectedDamage.id).padStart(2, "0")} / FAILURE MODE
              </span>

              <h2>{selectedDamage.name}</h2>
              <p>{selectedDamage.short}</p>
            </div>

            <div className="modal-grid">
              <div>
                <section>
                  <label>CAUSES</label>

                  <ul>
                    {selectedDamage.causes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <label>DETECTED BY</label>

                  <div className="sensor-pills">
                    {selectedDamage.sensors.map((sensor) => (
                      <span key={sensor}>{sensor}</span>
                    ))}
                  </div>
                </section>

                <section>
                  <label>WHY THESE SENSORS?</label>
                  <p>{selectedDamage.why}</p>
                </section>

                <section className="alternative">
                  <label>WHY NOT THE ALTERNATIVE?</label>
                  <p>{selectedDamage.alternative}</p>
                </section>
              </div>

              <div>
                <section className="nunar-box">
                  <label>NUNAR ASSESSMENT</label>

                  <p>{selectedDamage.nunar}</p>

                  <div className="mini-chain">
                    <span>DETECT</span>
                    <i />
                    <span>ALIGN</span>
                    <i />
                    <span>ASSESS</span>
                  </div>
                </section>

                <section>
                  <label>WHAT TO CHECK</label>

                  <ul>
                    {selectedDamage.checks.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <label>REQUIRED SPARES / MATERIALS</label>

                  <ul>
                    {selectedDamage.spares.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;