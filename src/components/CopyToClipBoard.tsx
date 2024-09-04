import React, { useState } from "react";
import Input from "./Input";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function CopyToClipBoard({ text }: { text: string }) {
  const [copied, setCopied] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  async function handleCopy() {
    try {
      if (typeof window !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        await setCopied(true);
        await setShowTooltip(true);
        await setTimeout(() => setCopied(false), 2000);
        console.info(`Copied to clipboard`);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert(`Copied to clipboard`);

        console.info(`Copied to clipboard`);
      }
    } catch (error: any) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <div className="w-full">
      <div className="relative">
        <label htmlFor="copy-input" className="sr-only">
          Label
        </label>
        <Input inputClass="!bg-neutral-200" value={text} />
        <Tooltip.Provider>
          <Tooltip.Root
            open={showTooltip}
            onOpenChange={setShowTooltip}
            delayDuration={200}
          >
            <Tooltip.Trigger asChild>
              <button
                onClick={handleCopy}
                className="absolute end-2 top-1/2 -translate-y-1/2 text-neutral-700 group hover:text-white hover:bg-blue-600 rounded-lg p-2 inline-flex items-center justify-center"
              >
                {copied ? (
                  <span id="success-icon" className="inline-flex items-center">
                    <svg
                      className="w-3.5 h-3.5 text-neutral-900 group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                  </span>
                ) : (
                  <span id="default-icon">
                    <svg
                      className="w-3.5 h-3.5 fill-neutral-900 group-hover:fill-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                    </svg>
                  </span>
                )}
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="
                data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade
                inline-block text-sm z-10 font-medium text-white bg-gray-700 p-2 rounded shadow-lg"
                // sideOffset={5}
                align="center"
              >
                {copied ? "Copied!" : "Copy to clipboard"}
                <Tooltip.Arrow className="fill-gray-700" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </div>
  );
}
