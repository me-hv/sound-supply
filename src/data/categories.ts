import { Category } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "cat-studio-recording",
    name: "Studio & Recording",
    slug: "studio-recording",
    tagline: "Interfaces, monitors, preamps & acoustics for pristine capture",
    description: "Equip your control room and home workspace with industry-standard audio converters, reference monitors, and preamplification.",
    iconName: "Sliders",
    featuredBrands: ["focusrite", "yamaha", "universal-audio", "genelec"],
    groups: [
      {
        name: "Recording",
        items: [
          { id: "sub-audio-interfaces", name: "Audio Interfaces", slug: "audio-interfaces", itemCount: 42 },
          { id: "sub-preamps", name: "Microphone Preamps", slug: "preamps", itemCount: 18 },
          { id: "sub-studio-mixers", name: "Studio Mixers", slug: "studio-mixers", itemCount: 25 },
          { id: "sub-converters", name: "AD/DA Converters", slug: "converters", itemCount: 14 },
          { id: "sub-recording-bundles", name: "Recording Bundles", slug: "recording-bundles", itemCount: 31 },
        ],
      },
      {
        name: "Monitoring",
        items: [
          { id: "sub-studio-monitors", name: "Studio Monitors", slug: "studio-monitors", itemCount: 38 },
          { id: "sub-studio-headphones", name: "Studio Headphones", slug: "studio-headphones", itemCount: 54 },
          { id: "sub-headphone-amps", name: "Headphone Amps & DACs", slug: "headphone-amps", itemCount: 16 },
          { id: "sub-subwoofers", name: "Studio Subwoofers", slug: "subwoofers", itemCount: 12 },
        ],
      },
      {
        name: "Production",
        items: [
          { id: "sub-midi-keyboards", name: "MIDI Keyboards", slug: "midi-keyboards", itemCount: 36 },
          { id: "sub-pad-controllers", name: "Pad Controllers", slug: "pad-controllers", itemCount: 22 },
          { id: "sub-drum-machines", name: "Drum Machines & Samplers", slug: "drum-machines", itemCount: 19 },
          { id: "sub-control-surfaces", name: "DAW Control Surfaces", slug: "control-surfaces", itemCount: 15 },
        ],
      },
      {
        name: "Acoustics & Setup",
        items: [
          { id: "sub-acoustic-panels", name: "Acoustic Treatment Panels", slug: "acoustic-panels", itemCount: 28 },
          { id: "sub-bass-traps", name: "Corner Bass Traps", slug: "bass-traps", itemCount: 14 },
          { id: "sub-monitor-stands", name: "Monitor Isolation & Stands", slug: "monitor-stands", itemCount: 24 },
          { id: "sub-studio-desks", name: "Studio Desks & Racks", slug: "studio-desks", itemCount: 11 },
        ],
      },
    ],
  },
  {
    id: "cat-microphones",
    name: "Microphones",
    slug: "microphones",
    tagline: "Dynamic, condenser, ribbon & USB mics for vocals and instruments",
    description: "From broadcast legends to precision tube condensers, capture every vocal nuance and acoustic instrument detail.",
    iconName: "Mic",
    featuredBrands: ["shure", "sennheiser", "audio-technica", "rode"],
    groups: [
      {
        name: "Studio Microphones",
        items: [
          { id: "sub-large-condenser", name: "Large Diaphragm Condensers", slug: "large-condensers", itemCount: 34 },
          { id: "sub-small-condenser", name: "Small Diaphragm / Pencil Mics", slug: "small-condensers", itemCount: 22 },
          { id: "sub-dynamic-studio", name: "Dynamic Vocal Mics", slug: "dynamic-microphones", itemCount: 29 },
          { id: "sub-ribbon-mics", name: "Ribbon Microphones", slug: "ribbon-mics", itemCount: 12 },
        ],
      },
      {
        name: "Broadcast & Creator",
        items: [
          { id: "sub-usb-mics", name: "USB Microphones", slug: "usb-microphones", itemCount: 27 },
          { id: "sub-podcast-mics", name: "Podcast & Broadcast Mics", slug: "podcast-microphones", itemCount: 19 },
          { id: "sub-shotgun-mics", name: "Shotgun & Camera Mics", slug: "shotgun-microphones", itemCount: 16 },
        ],
      },
      {
        name: "Mic Accessories",
        items: [
          { id: "sub-shockmounts", name: "Shockmounts & Pop Filters", slug: "shockmounts", itemCount: 32 },
          { id: "sub-boom-arms", name: "Broadcast Boom Arms", slug: "boom-arms", itemCount: 18 },
          { id: "sub-mic-cables", name: "Balanced XLR Cables", slug: "mic-cables", itemCount: 45 },
        ],
      },
    ],
  },
  {
    id: "cat-guitars",
    name: "Guitars",
    slug: "guitars",
    tagline: "Electric, acoustic, classical, tube amps & pedalboards",
    description: "Solid-body electrics, solid-top acoustics, analog effects pedals, and stage-ready amplification.",
    iconName: "Guitar",
    featuredBrands: ["fender", "yamaha", "ibanez", "boss"],
    groups: [
      {
        name: "Instruments",
        items: [
          { id: "sub-electric-guitars", name: "Electric Guitars", slug: "electric-guitars", itemCount: 68 },
          { id: "sub-acoustic-guitars", name: "Acoustic Guitars", slug: "acoustic-guitars", itemCount: 52 },
          { id: "sub-classical-guitars", name: "Classical & Nylon String", slug: "classical-guitars", itemCount: 20 },
        ],
      },
      {
        name: "Amplification",
        items: [
          { id: "sub-tube-amps", name: "Tube Guitar Combos", slug: "tube-amps", itemCount: 24 },
          { id: "sub-modeling-amps", name: "Digital Modeling Amps", slug: "modeling-amps", itemCount: 30 },
          { id: "sub-cab-sims", name: "Cab Simulators & Load Boxes", slug: "cab-sims", itemCount: 14 },
        ],
      },
      {
        name: "Effects & Routing",
        items: [
          { id: "sub-overdrive-distortion", name: "Overdrive & Distortion", slug: "overdrive-distortion", itemCount: 44 },
          { id: "sub-delay-reverb", name: "Delay & Reverb Pedals", slug: "delay-reverb", itemCount: 36 },
          { id: "sub-pedalboards-power", name: "Pedalboards & Isolated Power", slug: "pedalboards-power", itemCount: 26 },
        ],
      },
    ],
  },
  {
    id: "cat-bass",
    name: "Bass",
    slug: "bass",
    tagline: "4-string, 5-string electric basses, bass amps & preamps",
    description: "Punchy low-end instruments, neodymium bass enclosures, and precision DI preamps.",
    iconName: "Volume2",
    groups: [
      {
        name: "Basses",
        items: [
          { id: "sub-4-string", name: "4-String Electric Bass", slug: "4-string-bass", itemCount: 35 },
          { id: "sub-5-string", name: "5-String Electric Bass", slug: "5-string-bass", itemCount: 28 },
          { id: "sub-acoustic-bass", name: "Acoustic Basses", slug: "acoustic-bass", itemCount: 10 },
        ],
      },
      {
        name: "Bass Gear",
        items: [
          { id: "sub-bass-combos", name: "Bass Combos", slug: "bass-combos", itemCount: 22 },
          { id: "sub-bass-preamps", name: "Bass DI & Preamps", slug: "bass-preamps", itemCount: 16 },
        ],
      },
    ],
  },
  {
    id: "cat-keyboards-synths",
    name: "Keyboards & Synths",
    slug: "keyboards-synths",
    tagline: "Analog synthesizers, digital pianos, MIDI controllers & workstations",
    description: "Expressive weighted keys, modular synthesizers, and vintage analog reissue engines.",
    iconName: "Piano",
    featuredBrands: ["arturia", "roland", "yamaha", "korg"],
    groups: [
      {
        name: "Keyboards",
        items: [
          { id: "sub-digital-pianos", name: "88-Key Digital Pianos", slug: "digital-pianos", itemCount: 29 },
          { id: "sub-arrangers", name: "Arranger Keyboards", slug: "arrangers", itemCount: 24 },
          { id: "sub-synth-workstations", name: "Synth Workstations", slug: "synth-workstations", itemCount: 18 },
        ],
      },
      {
        name: "Synthesizers",
        items: [
          { id: "sub-analog-synths", name: "Analog Synthesizers", slug: "analog-synths", itemCount: 32 },
          { id: "sub-fm-digital-synths", name: "Digital & FM Synths", slug: "digital-synths", itemCount: 22 },
          { id: "sub-eurorack", name: "Eurorack & Modular", slug: "eurorack-modular", itemCount: 40 },
        ],
      },
    ],
  },
  {
    id: "cat-drums",
    name: "Drums",
    slug: "drums",
    tagline: "Electronic drum kits, acoustic shells, cymbals & hardware",
    description: "Mesh-head electronic drum kits with multi-zone triggers, studio acoustics, and snare drums.",
    iconName: "Disc",
    featuredBrands: ["roland", "yamaha", "alesis"],
    groups: [
      {
        name: "Electronic Percussion",
        items: [
          { id: "sub-electronic-kits", name: "Electronic Drum Kits", slug: "electronic-drum-kits", itemCount: 28 },
          { id: "sub-percussion-pads", name: "Sample & Multipads", slug: "multipads", itemCount: 16 },
          { id: "sub-drum-triggers", name: "Acoustic Drum Triggers", slug: "drum-triggers", itemCount: 14 },
        ],
      },
      {
        name: "Acoustic Drums",
        items: [
          { id: "sub-acoustic-kits", name: "Acoustic Shell Packs", slug: "acoustic-shell-packs", itemCount: 22 },
          { id: "sub-snare-drums", name: "Snare Drums", slug: "snare-drums", itemCount: 30 },
          { id: "sub-cymbals", name: "Cymbal Sets & Packs", slug: "cymbals", itemCount: 45 },
        ],
      },
    ],
  },
  {
    id: "cat-live-sound",
    name: "Live Sound",
    slug: "live-sound",
    tagline: "PA speakers, wireless in-ear monitors, stage mixers & snakes",
    description: "Concert-grade active loudspeakers, wireless microphone systems, and digital stageboxes.",
    iconName: "Speaker",
    groups: [
      {
        name: "PA Systems",
        items: [
          { id: "sub-powered-speakers", name: "Powered PA Speakers", slug: "powered-pa-speakers", itemCount: 34 },
          { id: "sub-column-pa", name: "Column PA Systems", slug: "column-pa-systems", itemCount: 16 },
          { id: "sub-digital-mixers", name: "Digital Stage Mixers", slug: "digital-stage-mixers", itemCount: 21 },
        ],
      },
      {
        name: "Monitoring & Wireless",
        items: [
          { id: "sub-wireless-mics", name: "Wireless Mic Systems", slug: "wireless-microphones", itemCount: 26 },
          { id: "sub-iem-systems", name: "In-Ear Monitor (IEM) Systems", slug: "iem-systems", itemCount: 19 },
        ],
      },
    ],
  },
  {
    id: "cat-dj",
    name: "DJ",
    slug: "dj",
    tagline: "All-in-one DJ controllers, media players, rotary mixers & headphones",
    description: "Multi-channel club mixers, motorized jog wheels, and club-ready DJ headphones.",
    iconName: "Radio",
    groups: [
      {
        name: "DJ Performance",
        items: [
          { id: "sub-dj-controllers", name: "DJ Controllers", slug: "dj-controllers", itemCount: 24 },
          { id: "sub-standalone-dj", name: "Standalone DJ Systems", slug: "standalone-dj-systems", itemCount: 12 },
          { id: "sub-turntables", name: "Direct-Drive Turntables", slug: "dj-turntables", itemCount: 14 },
          { id: "sub-dj-headphones", name: "DJ Headphones", slug: "dj-headphones", itemCount: 22 },
        ],
      },
    ],
  },
  {
    id: "cat-software",
    name: "Software & Plugins",
    slug: "software-plugins",
    tagline: "DAWs, virtual instruments, mixing suites & restoration tools",
    description: "Digital audio workstations, orchestral sound libraries, and vintage analog modeling plugins.",
    iconName: "Cpu",
    groups: [
      {
        name: "Applications",
        items: [
          { id: "sub-daws", name: "DAWs & Sequencers", slug: "daws", itemCount: 15 },
          { id: "sub-virtual-instruments", name: "Virtual Instruments", slug: "virtual-instruments", itemCount: 38 },
          { id: "sub-mixing-plugins", name: "EQ, Compression & Reverbs", slug: "mixing-plugins", itemCount: 50 },
        ],
      },
    ],
  },
  {
    id: "cat-accessories",
    name: "Accessories",
    slug: "accessories",
    tagline: "Oxygen-free copper cables, heavy-duty stands, rack cases & power",
    description: "Rugged studio furniture, Mogami-grade cabling, and conditioned surge distribution.",
    iconName: "Tool",
    groups: [
      {
        name: "Cabling & Interconnects",
        items: [
          { id: "sub-instrument-cables", name: "Instrument 1/4\" Cables", slug: "instrument-cables", itemCount: 32 },
          { id: "sub-patch-cables", name: "Balanced TRS & Patch Cables", slug: "patch-cables", itemCount: 40 },
          { id: "sub-power-conditioners", name: "Power Conditioners & Surges", slug: "power-conditioners", itemCount: 15 },
        ],
      },
    ],
  },
  {
    id: "cat-deals",
    name: "Deals",
    slug: "deals",
    tagline: "Special promotional discounts, studio bundles & clearance stock",
    description: "Limited-time offers on certified open-box, discontinued revisions, and studio bundle discounts.",
    iconName: "Tag",
  },
];
