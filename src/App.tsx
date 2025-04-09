"use client";

import { useState } from "react";
import ValueControl from "./components/ValueControl";

function App() {
  const [normalValue, setNormalValue] = useState<{
    value: number;
    unit: "px" | "%";
  }>({ value: 4, unit: "%" });
  const [hoverButtonValue, setHoverButtonValue] = useState<{
    value: number;
    unit: "px" | "%";
  }>({ value: 4, unit: "%" });
  const [hoverInputValue, setHoverInputValue] = useState<{
    value: number;
    unit: "px" | "%";
  }>({ value: 4, unit: "%" });
  const [focusValue, setFocusValue] = useState<{
    value: number;
    unit: "px" | "%";
  }>({ value: 4, unit: "%" });

  return (
    <div className="min-h-screen bg-[#151515] text-white p-8">
      <h1 className="text-2xl font-bold mb-8">Value Stepper Component</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl mb-4">Normal</h2>
          <ValueControl
            initialValue={normalValue.value}
            initialUnit={normalValue.unit}
            onChange={(value, unit) => setNormalValue({ value, unit })}
          />
        </div>

        <div>
          <h2 className="text-xl mb-4">Hover on button</h2>
          <ValueControl
            initialValue={hoverButtonValue.value}
            initialUnit={hoverButtonValue.unit}
            onChange={(value, unit) => setHoverButtonValue({ value, unit })}
          />
          <p className="text-sm text-[#aaaaaa] mt-2">
            Hover effect is implemented in the component
          </p>
        </div>

        <div>
          <h2 className="text-xl mb-4">Hover on input</h2>
          <ValueControl
            initialValue={hoverInputValue.value}
            initialUnit={hoverInputValue.unit}
            onChange={(value, unit) => setHoverInputValue({ value, unit })}
          />
          <p className="text-sm text-[#aaaaaa] mt-2">
            Hover effect is implemented in the component
          </p>
        </div>

        <div>
          <h2 className="text-xl mb-4">Focus</h2>
          <ValueControl
            initialValue={focusValue.value}
            initialUnit={focusValue.unit}
            onChange={(value, unit) => setFocusValue({ value, unit })}
          />
          <p className="text-sm text-[#aaaaaa] mt-2">
            Focus effect is implemented in the component
          </p>
        </div>

        <div>
          <h2 className="text-xl mb-4">Value must be greater than 0</h2>
          <ValueControl initialValue={0} />
          <p className="text-sm text-[#aaaaaa] mt-2">
            The "-" button is disabled when value is 0
          </p>
        </div>

        <div>
          <h2 className="text-xl mb-4">Value must be smaller than 100</h2>
          <ValueControl initialValue={100} />
          <p className="text-sm text-[#aaaaaa] mt-2">
            The "+" button is disabled when value is 100 and unit is %
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
