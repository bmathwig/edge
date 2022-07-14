"use strict";

const Waveforms = {
  click: 4099,
  // buzz_continuous: 4100,
  rumble_continuous: 4101,
  press: 4102,
  release: 4103,
  hover: 4104,
  success: 4105,
  error: 4106,
  ink_continuous: 4107,
  pencil_continuous: 4108,
  marker_continuous: 4109,
  chisel_marker_continuous: 4110,
  brush_continuous: 4111,
  eraser_continuous: 4112,
  first_custom_vendor_defined: 10752,
  second_custom_vendor_defined: 8479,
  galaxy_pen_continuous: 4113,
};

function isTransientWaveform(waveform) {
  switch (waveform) {
    case Waveforms.click:
    case Waveforms.press:
    case Waveforms.release:
    case Waveforms.hover:
    case Waveforms.success:
    case Waveforms.error:
      return true;
    default:
      return false;
  }
}

//-----------------------------------------------------------------------------

function main() {
  const State = {
    waveform: Waveforms.marker_continuous,
    intensity: 1
  };

  /**
   * Set the STATE `selectedWaveform` to the given `waveformId`
   * @param {number} waveformId 
   */
  function setPredefinedWaveform(waveformId) {
    State.waveform = waveformId;
  }

  /**
   * Set the STATE `selectedIntensity` to the given value
   * @param {number} intensityValue
   */
  function setIntensity(intensityValue) {
    State.intensity = intensityValue;
  }

  /**
   * Play a Transient waveform given an interaction event
   * @param {number} waveformId 
   * @param {PointerEvent} event 
   */
  function playTransientWaveform(waveformId, event) {
    if (event.pointerType === 'pen' && isTransientWaveform(waveformId)) {
      event.haptics.play(new HapticsPredefinedWaveform({
        waveformId: waveformId,
        intensity: State.intensity
      }));
    }
  }

  //---------------------------------------------------------------------------
  // DOCUMENT READY
  //---------------------------------------------------------------------------
  if (document.readyState != 'loading') {
    const waveform_list = document.querySelector('#options-waveform-list');
    const intensity_slider = document.querySelector('#options-intensity');

    // Populate the Continuous Waveform List control
    for (const [key, value] of Object.entries(Waveforms)) {
      if (!isTransientWaveform(Waveforms[key])) {
        const option = document.createElement('option');

        option.textContent = key;
        option.value = value;

        waveform_list.appendChild(option);
      }
    }

    // Set the default waveform
    waveform_list.value = State.waveform;

    // Subscribe change events to STATE controls
    waveform_list.addEventListener('change', function(event) {
      setPredefinedWaveform(event.target.value);
    });

    intensity_slider.addEventListener('change', function(event) {
      setIntensity(event.target.value);
      document.querySelector('#options-intensity-value').textContent = event.target.value;
    });

    // Bind the Transient Waveform controls
    document.querySelector('#options-waveform-click').addEventListener('pointerdown', playTransientWaveform.bind(null, Waveforms.click));
    document.querySelector('#options-waveform-press').addEventListener('pointerdown', playTransientWaveform.bind(null, Waveforms.press));
    document.querySelector('#options-waveform-release').addEventListener('pointerup', playTransientWaveform.bind(null, Waveforms.release));
    document.querySelector('#options-waveform-hover').addEventListener('pointerover', playTransientWaveform.bind(null, Waveforms.hover));
    document.querySelector('#options-waveform-success').addEventListener('pointerdown', playTransientWaveform.bind(null, Waveforms.success));
    document.querySelector('#options-waveform-error').addEventListener('pointerdown', playTransientWaveform.bind(null, Waveforms.error));

    // Configure the haptics surface
    const surface = document.querySelector('#haptics-surface');

    surface.addEventListener('pointerover', function(event) {
      if (event.pointerType === 'pen') {
        event.haptics.play(new HapticsPredefinedWaveform({
          waveformId: State.waveform,
          intensity: State.intensity
        }));
      }
    });

  } else {
    document.addEventListener('DOMContentLoaded', main);
  }
};

main();