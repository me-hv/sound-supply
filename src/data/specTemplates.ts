import { CategorySpecificationTemplate } from "@/types";

export const CATEGORY_SPEC_TEMPLATES: Record<string, CategorySpecificationTemplate> = {
  microphones: {
    categorySlug: "microphones",
    groups: [
      "Capsule & Transducer",
      "Acoustics & Polar Pattern",
      "Electrical Performance",
      "Connectivity & Hardware",
    ],
    fields: [
      { key: "transducer_type", label: "Transducer Type", group: "Capsule & Transducer", type: "select", comparable: true, filterFacet: true },
      { key: "polar_pattern", label: "Polar Pattern", group: "Acoustics & Polar Pattern", type: "select", comparable: true, filterFacet: true },
      { key: "frequency_response", label: "Frequency Response", group: "Electrical Performance", type: "text", comparable: true },
      { key: "sensitivity", label: "Sensitivity", group: "Electrical Performance", type: "text", comparable: true },
      { key: "max_spl", label: "Maximum SPL", group: "Electrical Performance", type: "text", comparable: true },
      { key: "output_impedance", label: "Output Impedance", group: "Electrical Performance", type: "text" },
      { key: "phantom_power_req", label: "Phantom Power Requirement", group: "Electrical Performance", type: "text" },
      { key: "connector_type", label: "Output Connector", group: "Connectivity & Hardware", type: "select", comparable: true },
      { key: "weight", label: "Weight", group: "Connectivity & Hardware", type: "text" },
    ],
  },
  "studio-monitors": {
    categorySlug: "studio-recording",
    groups: [
      "Acoustic Drivers",
      "Amplification & Power",
      "Acoustics & Frequency",
      "Room Tuning & DSP",
      "Inputs & Enclosure",
    ],
    fields: [
      { key: "system_type", label: "System Configuration", group: "Acoustic Drivers", type: "select", comparable: true },
      { key: "lf_driver", label: "Low Frequency Driver (Woofer)", group: "Acoustic Drivers", type: "text", comparable: true, filterFacet: true },
      { key: "hf_driver", label: "High Frequency Driver (Tweeter)", group: "Acoustic Drivers", type: "text", comparable: true },
      { key: "total_power", label: "Total Power Output (RMS)", group: "Amplification & Power", type: "text", comparable: true },
      { key: "frequency_response", label: "Frequency Range (-10dB)", group: "Acoustics & Frequency", type: "text", comparable: true },
      { key: "max_peak_spl", label: "Maximum Peak SPL", group: "Acoustics & Frequency", type: "text", comparable: true },
      { key: "room_correction", label: "Acoustic Room Tuning", group: "Room Tuning & DSP", type: "text" },
      { key: "inputs", label: "Input Connectors", group: "Inputs & Enclosure", type: "text", comparable: true },
      { key: "cabinet_type", label: "Cabinet Enclosure", group: "Inputs & Enclosure", type: "text" },
    ],
  },
  "audio-interfaces": {
    categorySlug: "studio-recording",
    groups: [
      "AD/DA Conversion",
      "Preamp & Dynamic Range",
      "Inputs & Outputs (I/O)",
      "DSP & Monitoring",
      "Compatibility & Power",
    ],
    fields: [
      { key: "ad_resolution", label: "A/D Resolution", group: "AD/DA Conversion", type: "text", comparable: true },
      { key: "dynamic_range", label: "D/A Dynamic Range", group: "AD/DA Conversion", type: "text", comparable: true, filterFacet: true },
      { key: "preamp_gain", label: "Mic Preamp Gain Range", group: "Preamp & Dynamic Range", type: "text", comparable: true },
      { key: "simultaneous_io", label: "Simultaneous I/O Channels", group: "Inputs & Outputs (I/O)", type: "text", comparable: true, filterFacet: true },
      { key: "analog_inputs", label: "Analog Inputs", group: "Inputs & Outputs (I/O)", type: "text", comparable: true },
      { key: "analog_outputs", label: "Analog Outputs", group: "Inputs & Outputs (I/O)", type: "text", comparable: true },
      { key: "headphone_outs", label: "Headphone Outputs", group: "Inputs & Outputs (I/O)", type: "text" },
      { key: "connection_type", label: "Computer Connection", group: "Compatibility & Power", type: "select", comparable: true, filterFacet: true },
      { key: "bus_powered", label: "Bus Powered Support", group: "Compatibility & Power", type: "boolean", comparable: true },
    ],
  },
  "midi-keyboards": {
    categorySlug: "keyboards-synths",
    groups: [
      "Keybed & Expression",
      "Performance Controls",
      "Sequencing & Arpeggiation",
      "Connectivity & Hardware",
    ],
    fields: [
      { key: "key_count", label: "Number of Keys", group: "Keybed & Expression", type: "number", comparable: true, filterFacet: true },
      { key: "key_action", label: "Key Action / Type", group: "Keybed & Expression", type: "select", comparable: true },
      { key: "aftertouch", label: "Aftertouch Support", group: "Keybed & Expression", type: "boolean", comparable: true },
      { key: "pads_count", label: "Performance Pads", group: "Performance Controls", type: "text" },
      { key: "knobs_faders", label: "Encoders & Faders", group: "Performance Controls", type: "text" },
      { key: "midi_io", label: "Hardware MIDI I/O", group: "Connectivity & Hardware", type: "text", comparable: true },
      { key: "cv_gate", label: "CV/Gate Analog Outputs", group: "Connectivity & Hardware", type: "text" },
    ],
  },
};
