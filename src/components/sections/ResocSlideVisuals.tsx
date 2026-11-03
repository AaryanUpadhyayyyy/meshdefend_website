import type { ReactNode } from "react";

type TextProps = {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  weight?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  family?: string;
};

const ink = "#182230";
const muted = "#687789";
const line = "#dce3ea";
const pale = "#f5f7f9";
const orange = "#f45532";
const green = "#22b573";
const blue = "#4588ed";

function T({ x, y, children, size = 16, weight = 500, fill = ink, anchor = "start", family = "Inter, Arial, sans-serif" }: TextProps) {
  return <text x={x} y={y} fill={fill} fontFamily={family} fontSize={size} fontWeight={weight} textAnchor={anchor}>{children}</text>;
}

function Dot({ x, y, color = orange, r = 5 }: { x: number; y: number; color?: string; r?: number }) {
  return <circle cx={x} cy={y} r={r} fill={color} />;
}

function Canvas({ capability, children }: { capability: string; children: ReactNode }) {
  return (
    <svg className="solution-story__image" viewBox="0 0 1200 620" preserveAspectRatio="xMidYMid meet" role="group" aria-label={`${capability} dashboard illustration`}>
      <rect className="solution-story__svg-background" x="8" y="8" width="1184" height="604" rx="20" fill="#fff" />
      {children}
    </svg>
  );
}

function Window({ x, y, w, h, title }: { x: number; y: number; w: number; h: number; title?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="14" fill="#fff" stroke={line} strokeWidth="2" />
      <path d={`M${x + 1} ${y + 42}H${x + w - 1}`} stroke={line} strokeWidth="2" />
      <Dot x={x + 20} y={y + 21} color="#ff716c" r={5} />
      <Dot x={x + 37} y={y + 21} color="#ffbe4f" r={5} />
      <Dot x={x + 54} y={y + 21} color="#4ec681" r={5} />
      {title && <T x={x + 76} y={y + 27} size={15} weight={700}>{title}</T>}
    </g>
  );
}

function BackupInsights() {
  const rows = ["Oct 21 · 00:00", "Oct 20 · 23:00", "Oct 20 · 22:00"];
  const heat = [
    ["#e7f6eb", "#d8f2e1", "#c2edce", "#d6edb7", "#f6e596", "#ffce79", "#ffab69", "#f98767", "#f4765b", "#f8926d", "#ffcb77", "#d7efb7", "#a7dfaa", "#8ed69a", "#acdca5", "#e5efc1"],
    ["#edf7e9", "#e3f4dd", "#c2edce", "#b9e5bc", "#f1e9a4", "#ffd27d", "#ffb16b", "#fb8160", "#f45b4b", "#f76b50", "#ffbd73", "#c5e7a8", "#a0d995", "#84d08c", "#9ed995", "#dceec0"],
    ["#edf7e9", "#d9f1dd", "#b6e8c4", "#cfeab5", "#eee99a", "#ffd47c", "#ffab68", "#f67d5d", "#f45b4b", "#fa7457", "#ffc475", "#d1ecad", "#9cda98", "#84d08b", "#9bd994", "#e7f2c8"],
  ];
  return (
    <Canvas capability="Unified Resilience Observability">
      <T x={34} y={49} size={14} weight={800} family="monospace">BACKUP · STORAGE · CLOUD</T>
      <T x={34} y={75} size={14} fill={muted}>Connected protection sources</T>
      {["Backup", "Storage", "Cloud", "Security", "ITSM"].map((label, i) => {
        const y = 124 + i * 79;
        return <g key={label}><rect x="32" y={y} width="140" height="54" rx="12" fill="#fff" stroke={line} strokeWidth="2" /><circle cx="54" cy={y + 27} r="11" fill="#fff3ef" /><Dot x={54} y={y + 27} r={5} /><T x={75} y={y + 33} size={15} weight={650}>{label}</T><path d={`M172 ${y + 27} C195 ${y + 27}, 193 271, 220 271`} fill="none" stroke="#aab8c7" strokeWidth="2" /></g>;
      })}
      <Dot x={220} y={271} r={6} />
      <Window x={216} y={77} w={656} h={464} title="MD Insights · Backup Window Analysis" />
      <rect x="238" y="138" width="54" height="30" rx="8" fill={pale} stroke={line} /><T x={265} y={158} size={13} anchor="middle">6h</T>
      <rect x="300" y="138" width="54" height="30" rx="8" fill={pale} stroke={line} /><T x={327} y={158} size={13} anchor="middle">12h</T>
      <rect x="362" y="138" width="58" height="30" rx="8" fill={orange} /><T x={391} y={158} size={13} fill="#fff" weight={700} anchor="middle">24h</T>
      <rect x="428" y="138" width="82" height="30" rx="8" fill={pale} stroke={line} /><T x={469} y={158} size={13} anchor="middle">Custom</T>
      <rect x="698" y="138" width="150" height="30" rx="8" fill="#fff" stroke={line} /><T x={715} y={158} size={13}>All engines</T>
      <T x={240} y={198} size={12} fill={muted}>JOBS</T>
      {[green, "#b8e5b4", "#f4df87", "#ffad69", orange, "#ed4c43"].map((color, i) => <g key={color}><rect x={310 + i * 75} y="184" width="14" height="14" rx="3" fill={color} /><T x={331 + i * 75} y={196} size={12} fill={muted}>{["Low", "Light", "Medium", "High", "Max", "Risk"][i]}</T></g>)}
      <path d="M239 220H850" stroke={line} strokeWidth="2" />
      {Array.from({ length: 16 }, (_, i) => <T key={i} x={300 + i * 33} y={242} size={10} fill={muted} anchor="middle">{String(i).padStart(2, "0")}</T>)}
      {rows.map((row, r) => <g key={row}><T x={240} y={274 + r * 58} size={11} fill={muted}>{row}</T>{heat[r].map((color, c) => <g key={`${r}-${c}`}><rect x={285 + c * 34} y={253 + r * 58} width="31" height="38" rx="4" fill={color} stroke="#fff" /><T x={300 + c * 34} y={277 + r * 58} size={10} fill="#526070" anchor="middle">{(c * 3 + r) % 9}</T></g>)}</g>)}
      <rect x="907" y="92" width="258" height="425" rx="14" fill="#fff" stroke={line} strokeWidth="2" />
      <T x={930} y={124} size={18} weight={750}>Protection Copies</T>
      {[ ["Total assets", "164"], ["Total copies", "1,750"], ["Single-copy risk", "114"] ].map(([label, value], i) => <g key={label}><rect x="926" y={145 + i * 98} width="220" height="82" rx="10" fill={pale} /><T x={943} y={173 + i * 98} size={13} fill={muted}>{label}</T><T x={943} y={207 + i * 98} size={24} weight={750}>{value}</T><Dot x={1125} y={166 + i * 98} r={4} /></g>)}
      {[0, 1, 2].map((i) => <g key={i}><rect x="935" y={456 + i * 16} width="120" height="7" rx="4" fill="#e7ebef" /><circle cx="1125" cy={459 + i * 16} r="4" fill={i === 1 ? orange : green} /></g>)}
      <rect x="748" y="70" width="120" height="45" rx="12" fill="#fff" stroke="#ffd0c2" strokeWidth="2" /><path d="m766 84 10 0 0 16-10 0 0-16m-3 5 6-5 0 16-6-5" fill={orange} /><T x={787} y={98} size={14} weight={700}>One view</T>
    </Canvas>
  );
}

function ProtectionJobs() {
  const dots = Array.from({ length: 110 }, (_, i) => ({ x: 35 + (i % 11) * 17 + Math.floor(i / 11) * 2, y: 90 + Math.floor(i / 11) * 21 }));
  const jobs = [[265,"Daily_Backup_VM01","Prod-VM","Virtual Machine","Success"],[266,"DB_Full_Backup","DB-Prod","Database","Success"],[267,"FileServer_Inc","FS-Policy","File Server","Success"],[268,"App_Backup","App-Prod","Application","Failed"],[269,"NAS_Backup","NAS-Policy","NAS","Success"],[270,"Oracle_Backup","Oracle-Prod","Database","Success"],[271,"Exchange_Inc","EX-Policy","Application","Success"],[272,"SharePoint_Backup","SP-Policy","Application","Success"]] as const;
  return (
    <Canvas capability="Backup and Recovery Operations">
      {dots.map((dot, i) => <circle key={i} cx={dot.x} cy={dot.y} r="2.2" fill="#e6edf4" />)}
      <path d="M36 375h254" stroke="#dce3ea" strokeDasharray="5 8" />
      <T x={46} y={365} size={15} weight={800} fill={orange}>ALL OTHER JOBS: QUIET</T>
      <Window x={300} y={54} w={852} h={516} title="Protection Jobs" />
      {[["Total jobs","258",blue],["Failed jobs","4",orange],["Success jobs","251",green],["Other jobs","3",muted]].map(([a,b,c], i) => <g key={String(a)}><rect x={322 + i * 198} y="112" width="184" height="72" rx="10" fill="#fff" stroke={line} /><circle cx={344 + i * 198} cy="138" r="10" fill={String(c)} opacity=".15" /><Dot x={344 + i * 198} y={138} color={String(c)} r={5} /><T x={363 + i * 198} y={136} size={12} fill={muted}>{String(a)}</T><T x={343 + i * 198} y={166} size={21} weight={750}>{String(b)}</T></g>)}
      <rect x="322" y="202" width="808" height="34" rx="7" fill="#f7f9fb" />
      {[["Job ID", "Job name", "Policy name", "Asset type", "Status", "Start time", "Duration"]].map((headers) => headers.map((label, i) => <T key={label} x={[338,392,555,700,815,903,1030][i]} y={224} size={11} weight={700} fill={muted}>{label}</T>))}
      {jobs.map((job, i) => {
        const y = 238 + i * 37;
        const failed = job[4] === "Failed";
        return <g key={job[0]}><rect x="322" y={y} width="808" height="36" fill={failed ? "#fff0eb" : i % 2 ? "#fbfcfd" : "#fff"} stroke={failed ? orange : "#edf0f3"} /><T x={338} y={y + 23} size={12} fill={muted}>{job[0]}</T><T x={392} y={y + 23} size={12}>{job[1]}</T><T x={555} y={y + 23} size={12} fill={muted}>{job[2]}</T><T x={700} y={y + 23} size={12} fill={muted}>{job[3]}</T><rect x="810" y={y + 8} width="67" height="20" rx="10" fill={failed ? "#ffe0d7" : "#e3f7ec"} /><Dot x={822} y={y + 18} color={failed ? orange : green} r={4} /><T x={831} y={y + 22} size={11} weight={700} fill={failed ? orange : "#13844e"}>{job[4]}</T><T x={903} y={y + 23} size={11} fill={muted}>Oct 21, 2026 02:{String(i * 7 + 12).padStart(2, "0")}</T><T x={1030} y={y + 23} size={11} fill={muted}>00:02:18</T></g>;
      })}
      <g><rect x="922" y="325" width="236" height="94" rx="12" fill="#fff" stroke="#d6dfe8" strokeWidth="2" /><T x={941} y={351} size={14} weight={700}>Retry job 268</T><T x={941} y={371} size={12} fill={muted}>Approval required</T><rect x="940" y="384" width="102" height="27" rx="7" fill={orange} /><T x={991} y={402} size={12} weight={750} fill="#fff" anchor="middle">Approve</T><rect x="1050" y="384" width="88" height="27" rx="7" fill="#fff" stroke={line} /><T x={1094} y={402} size={12} weight={650} anchor="middle">Skip</T></g>
      <rect x="38" y="411" width="202" height="48" rx="12" fill="#fff" stroke="#ffb6a2" strokeDasharray="5 5" /><T x={54} y={441} size={14} weight={750} fill={orange}>4 exceptions need review</T>
      <path d="M238 435 C270 435 270 380 306 380" fill="none" stroke="#aab8c7" strokeWidth="2" strokeDasharray="5 6" />
    </Canvas>
  );
}

function IncidentWorkflow() {
  return (
    <Canvas capability="Agentic Incident Resolution">
      <rect x="28" y="252" width="238" height="112" rx="15" fill="#fff" stroke={line} strokeWidth="2" />
      <circle cx="58" cy="286" r="13" fill="#fff0eb" /><T x={58} y={292} size={17} weight={800} fill={orange} anchor="middle">!</T>
      <T x={82} y={282} size={14} weight={700}>Commvault job failed</T><rect x="82" y="298" width="62" height="24" rx="12" fill="#ffe4dc" /><T x={113} y={315} size={12} weight={700} fill={orange} anchor="middle">Failed</T>
      <path d="M266 307h90" stroke="#9eacba" strokeWidth="2" /><circle cx="292" cy="307" r="5" fill="#fff" stroke="#9eacba" strokeWidth="2" /><circle cx="326" cy="307" r="5" fill="#fff" stroke="#9eacba" strokeWidth="2" />
      <rect x="355" y="288" width="112" height="38" rx="8" fill="#fff" stroke={line} /><T x={411} y={312} size={12} weight={700} anchor="middle">CONTEXT KEPT</T>
      <path d="M467 307h68" stroke="#9eacba" strokeWidth="2" /><circle cx="500" cy="307" r="5" fill="#fff" stroke="#9eacba" strokeWidth="2" />
      <Window x={526} y={26} w={392} h={568} title="MD Companion" />
      <rect x="548" y="86" width="348" height="50" rx="10" fill="#f8fafc" stroke={line} />
      <T x={566} y={118} size={21} weight={750}>Troubleshooting Report</T>
      <rect x="548" y="150" width="348" height="112" rx="10" fill="#fff" stroke={line} />
      <T x={565} y={176} size={14} weight={750}>Job information</T>
      <T x={565} y={201} size={12} fill={muted}>Job ID</T><T x={688} y={201} size={12} weight={650}>268</T>
      <T x={565} y={224} size={12} fill={muted}>Vendor</T><T x={688} y={224} size={12} weight={650}>Commvault</T>
      <T x={565} y={247} size={12} fill={muted}>Error code</T><T x={688} y={247} size={12} weight={650}>None</T>
      <rect x="548" y="276" width="348" height="179" rx="10" fill="#fff" stroke={line} />
      <T x={565} y={303} size={14} weight={750}>Probable cause</T><T x={565} y={329} size={12} fill={muted}>Resource contention after leftover artifacts</T>
      {[0,1,2,3].map((i) => <g key={i}><circle cx={570} cy={353 + i * 22} r="4" fill="#bdc7d2" /><rect x="583" y={349 + i * 22} width={220 - i * 22} height="8" rx="4" fill="#e7ebef" /></g>)}
      {[0,1,2].map((i) => <g key={i}><rect x="548" y={470 + i * 36} width="348" height="28" rx="8" fill="#f8fafc" stroke="#edf0f3" /><circle cx="565" cy={484 + i * 36} r="4" fill="#bec8d2" /><rect x="579" y={480 + i * 36} width={190 + i * 18} height="7" rx="4" fill="#dce2e8" /></g>)}
      <path d="M918 307h61" stroke="#9eacba" strokeWidth="2" /><circle cx="947" cy="307" r="5" fill="#fff" stroke="#9eacba" strokeWidth="2" />
      <rect x="980" y="250" width="194" height="120" rx="14" fill="#fff" stroke={line} strokeWidth="2" />
      <path d="M1004 273h22v27h-22zM1008 280h14M1008 286h14" fill="none" stroke={ink} strokeWidth="2" />
      <T x={1038} y={282} size={13} weight={750}>Incident created</T><T x={1000} y={322} size={17} weight={750} fill={orange}>INC0011934</T>
      <rect x="1000" y="337" width="75" height="22" rx="11" fill="#e3f7ec" /><Dot x={1013} y={348} color={green} r={4} /><T x={1022} y={352} size={11} weight={700} fill="#13844e">Low</T>
      <rect x="1082" y="337" width="72" height="22" rx="11" fill="#e3f7ec" /><Dot x={1095} y={348} color={green} r={4} /><T x={1104} y={352} size={11} weight={700} fill="#13844e">New</T>
      <rect x="1000" y="378" width="154" height="31" rx="7" fill="#fff" stroke="#b8c5d2" /><T x={1077} y={399} size={12} weight={700} anchor="middle">Open incident</T>
    </Canvas>
  );
}

function SmartRoutine() {
  const nodes = [["Storage Utilization","QUERY"],["Storage Forecast","QUERY"],["Alerts","QUERY"],["Generate Report","REPORT"],["Email Report Notification","EMAIL"]];
  return (
    <Canvas capability="Agentic Automation">
      <Window x={28} y={42} w={846} h={538} title="MeshDefend · Routine Builder" />
      <rect x="46" y="100" width="154" height="458" rx="8" fill="#f8fafc" stroke={line} />
      <T x={64} y={129} size={14} weight={750}>Library</T>
      {["Nodes", "Assets", "Reports", "Storage", "Alerts", "Backup jobs"].map((label, i) => <g key={label}><rect x="58" y={146 + i * 43} width="128" height="34" rx="7" fill={i === 0 ? "#fff0eb" : "#fff"} stroke={i === 0 ? "#ffc7b7" : "#edf0f3"} /><T x={72} y={168 + i * 43} size={12} weight={i === 0 ? 700 : 500} fill={i === 0 ? orange : muted}>{label}</T></g>)}
      <rect x="220" y="100" width="634" height="458" rx="12" fill="#fff" stroke={line} />
      <rect x="243" y="126" width="584" height="407" rx="14" fill="#fffaf8" stroke={orange} strokeWidth="2" strokeDasharray="7 5" />
      <rect x="258" y="112" width="205" height="31" rx="8" fill={orange} /><T x={273} y={133} size={12} weight={750} fill="#fff">PPOD Storage Risk Overview</T>
      <T x={266} y={170} size={12} fill={muted}>WHEN · DAILY AT 06:00</T>
      <path d="M346 251 C385 251 381 329 414 329 M346 360 C382 360 382 329 414 329 M346 464 C387 464 381 329 414 329 M518 329h68M690 329h67" fill="none" stroke="#54c69c" strokeWidth="4" />
      {nodes.map(([label, kind], i) => {
        const pos = [[270,214],[270,323],[270,427],[431,294],[603,294]][i];
        const [x,y] = pos;
        const w = i < 3 ? 160 : i === 3 ? 150 : 202;
        return <g key={label}><rect x={x} y={y} width={w} height="72" rx="12" fill="#fff" stroke={line} strokeWidth="2" /><circle cx={x + 18} cy={y + 20} r="7" fill="#fff" stroke={blue} strokeWidth="2" /><T x={x + 34} y={y + 26} size={13} weight={700}>{label}</T><T x={x + 34} y={y + 48} size={10} fill={muted}>{kind}</T><Dot x={x + w} y={y + 36} color={green} r={5} /></g>;
      })}
      <rect x="718" y="54" width="122" height="32" rx="8" fill={orange} /><T x={779} y={75} size={12} weight={750} fill="#fff" anchor="middle">Configure routine</T>
      <path d="M804 329h84" stroke="#7c9ab1" strokeWidth="3" /><rect x="863" y="315" width="91" height="29" rx="14" fill="#fff" stroke={line} /><T x={908} y={334} size={11} weight={700} anchor="middle">Email sent</T>
      <g transform="rotate(3 1037 330)">
        <rect x="904" y="92" width="270" height="450" rx="16" fill="#fff" stroke={line} strokeWidth="2" />
        <path d="M905 134h268" stroke={line} strokeWidth="2" />
        <Dot x={925} y={113} color="#ff716c" r={4} /><Dot x={939} y={113} color="#ffbe4f" r={4} /><Dot x={953} y={113} color="#4ec681" r={4} />
        <T x={926} y={166} size={19} weight={750}>Asset Report</T><T x={926} y={188} size={11} fill={muted}>Protection engine status</T>
        <rect x="922" y="204" width="234" height="52" rx="9" fill="#f8fafc" /><T x={936} y={224} size={11} fill={muted}>Generated at</T><T x={936} y={243} size={13} weight={700}>21 Oct 2026 · 06:00</T>
        {[["Assets","70"],["Protected","91%"],["Unprotected","9%"]].map(([a,b],i)=><g key={a}><rect x={921 + i * 78} y="270" width="72" height="67" rx="9" fill="#fff" stroke={line} /><T x={929 + i * 78} y={291} size={10} fill={muted}>{a}</T><T x={929 + i * 78} y={320} size={19} weight={750}>{b}</T></g>)}
        <T x={925} y={366} size={13} weight={700}>Protection status</T>
        <circle cx="978" cy="418" r="28" fill="none" stroke="#e6edf1" strokeWidth="11" /><path d="M978 390 A28 28 0 1 1 954 432" fill="none" stroke={green} strokeWidth="11" />
        <T x={1020} y={410} size={11} fill={muted}>Protected</T><T x={1020} y={430} size={11} fill={muted}>Unprotected</T>
        <rect x="925" y="470" width="217" height="10" rx="5" fill="#e8edf1" /><rect x="925" y="470" width="178" height="10" rx="5" fill={green} />
        <T x={925} y={511} size={11} fill={muted}>Protection coverage · 91%</T>
      </g>
    </Canvas>
  );
}

function PaymentsRecovery() {
  const nodes = [
    { n: "1", label: "database", x: 562, y: 72, kind: "db" },
    { n: "2", label: "queue", x: 212, y: 218, kind: "queue" },
    { n: "3", label: "auth", x: 212, y: 398, kind: "shield" },
    { n: "4", label: "storage", x: 848, y: 218, kind: "cloud" },
    { n: "5", label: "checkout", x: 848, y: 398, kind: "cart" },
  ];
  return (
    <Canvas capability="Cyber Recovery">
      {[96,142,188].map((r) => <circle key={r} cx="628" cy="322" r={r} fill="none" stroke="#edf1f5" strokeWidth="2" />)}
      <path d="M628 192v75M378 257c66 0 80 58 134 58M378 437c66 0 80-58 134-58M756 315c56 0 69-58 92-58M756 379c56 0 69 58 92 58" fill="none" stroke="#a7b4c1" strokeWidth="3" />
      {nodes.map((node) => <g key={node.n}>
        <rect x={node.x} y={node.y} width="132" height="120" rx="16" fill="#fff" stroke={line} strokeWidth="2" />
        <circle cx={node.x + 8} cy={node.y + 7} r="16" fill={blue} /><T x={node.x + 8} y={node.y + 13} size={14} weight={800} fill="#fff" anchor="middle">{node.n}</T>
        {node.kind === "db" && <g fill="none" stroke={ink} strokeWidth="4"><ellipse cx={node.x+66} cy={node.y+34} rx="17" ry="7"/><path d={`M${node.x+49} ${node.y+34}v29c0 9 34 9 34 0v-29M${node.x+49} ${node.y+48}c0 9 34 9 34 0`}/></g>}
        {node.kind === "queue" && <g fill="none" stroke={ink} strokeWidth="4"><rect x={node.x+49} y={node.y+27} width="34" height="38" rx="6"/><path d={`M${node.x+56} ${node.y+39}h20m-20 10h20m-20 10h14`}/></g>}
        {node.kind === "shield" && <path d={`M${node.x+66} ${node.y+25}l18 7v15c0 13-8 22-18 29-10-7-18-16-18-29V${node.y+32}l18-7Z`} fill="none" stroke={ink} strokeWidth="4"/>}
        {node.kind === "cloud" && <path d={`M${node.x+48} ${node.y+53}c-15 0-16-20 0-22 5-18 31-17 35 0 20 0 18 23 0 23h-35Z`} fill="none" stroke={ink} strokeWidth="4"/>}
        {node.kind === "cart" && <g fill="none" stroke={ink} strokeWidth="4"><path d={`M${node.x+43} ${node.y+31}h10l8 35h32l9-25h-44`}/><circle cx={node.x+65} cy={node.y+76} r="4" fill={ink}/><circle cx={node.x+88} cy={node.y+76} r="4" fill={ink}/></g>}
        <T x={node.x+66} y={node.y+100} size={15} weight={700} anchor="middle">{node.label}</T>
      </g>)}
      <rect x="552" y="267" width="152" height="112" rx="18" fill="#fff" stroke="#d8e1e9" strokeWidth="2" />
      <g fill="none" stroke={ink} strokeWidth="5"><ellipse cx="628" cy="292" rx="22" ry="9"/><path d="M606 292v34c0 12 44 12 44 0v-34m-44 17c0 12 44 12 44 0"/></g>
      <T x={628} y={360} size={19} weight={750} anchor="middle">payments</T>
      <path d="M628 379v102" stroke={orange} strokeWidth="3" strokeDasharray="8 7" /><Dot x={628} y={394} r={6} /><Dot x={628} y={481} r={6} />
      <rect x="506" y="500" width="244" height="54" rx="14" fill="#fff8f5" stroke={orange} strokeWidth="2" strokeDasharray="7 5" />
      <path d="m533 528 13-13a8 8 0 0 1 11 11l-5 5m-3-3-5 5a8 8 0 1 1-11-11l5-5" fill="none" stroke={orange} strokeWidth="3" />
      <T x={568} y={533} size={14} weight={700}>Missed dependency</T>
      <rect x="1010" y="220" width="160" height="146" rx="14" fill="#fff" stroke={line} strokeWidth="2" />
      <T x={1032} y={251} size={14} weight={750}>Recovery proof</T>
      <T x={1032} y={288} size={15} fill={muted}>RTO</T><rect x="1080" y="265" width="70" height="34" rx="8" fill="#f0f3f6" /><T x={1115} y={288} size={13} weight={700} anchor="middle">Unproven</T>
      <T x={1032} y={341} size={15} fill={muted}>RPO</T><rect x="1080" y="318" width="70" height="34" rx="8" fill="#f0f3f6" /><T x={1115} y={341} size={13} weight={700} anchor="middle">Unproven</T>
      <T x={1010} y={398} size={14} weight={800} fill={ink}>RECOVERY ORDER</T>
      {[118, 100, 82].map((width, index) => {
        const y = 420 + index * 23;
        return <g key={width}><Dot x={1018} y={y} r={4} /><rect x="1032" y={y - 4} width={width} height="8" rx="4" fill="#e3e8ee" /></g>;
      })}
    </Canvas>
  );
}

const visuals = [BackupInsights, ProtectionJobs, IncidentWorkflow, SmartRoutine, PaymentsRecovery];

export function ResocSlideVisual({ index }: { index: number }) {
  const Visual = visuals[index % visuals.length];
  return <Visual />;
}
