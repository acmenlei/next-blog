import React, { memo } from 'react';

import { AppBackGroundWrapper } from "./style"

export default memo(function AppLightBackGround() {
  return (
    <AppBackGroundWrapper>
      <div className="contain-demo">
        <svg width="375" height="300" viewBox="0 0 375 300">
          <desc>Filter to create light on tree graphic.</desc>
          <filter id="demo4">
            <feGaussianBlur stdDeviation="3" result="blur4" />
            <feSpecularLighting result="spec4" in="blur4" specularExponent="35" lightingColor="#cccccc">
              <fePointLight x="75" y="100" z="200">
                <animate attributeName="x" values="75;320;75" dur="10s" repeatCount="indefinite" />
              </fePointLight>
            </feSpecularLighting>
            <feComposite in="SourceGraphic" in2="spec4" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>
          <desc>Filter to blur sun graphic.</desc>
          <filter id="demo5">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur5" />
            <feComposite in="SourceGraphic" in2="blur5" operator="arithmetic" k1="0" k2="3" k3="3" k4="0" />
          </filter>
          <desc>Tree with three red apples and a sun to demonstrate lighting filter animations.</desc>
          <g className="tree" filter="url(#demo4)">
            <g>
              <path fill="#60432D" d="M164.946 295.159c-1.1 0-1.483-0.737-0.85-1.637 0 0 16.417-23.364 15.008-70.364 0 0 26.5 0 26.5 0 0.098 6.118 0.523 12.264 0.988 18.364 0.901 11.82 2.561 23.979 5.527 35.467 1.626 6.298 6.668 16.396 6.668 16.396 0.491 0.984-0.007 1.785-1.107 1.78 0 0-1.699-0.008-2.18-0.008 -1.677-0.003-3.354-0.001-5.03 0 -4.573 0.004-9.147 0.001-13.72 0 -9.247-0.002-18.494 0-27.74 0.001C166.989 295.159 164.946 295.159 164.946 295.159z" />
            </g>
            <path fill="#A6BA50" stroke="#A6BA50" strokeLinecap="round" d="M251.203 175.839c3.07 4.72 4.84 10.35 4.84 16.39 0 16.69-13.52 30.22-30.21 30.22 -4.68 0-9.11-1.06-13.06-2.96 -5.32 8.66-14.87 14.43-25.77 14.43 -12.5 0-23.22-7.59-27.82-18.41 -0.79 0.08-1.58 0.11-2.39 0.11 -16.69 0-30.21-13.53-30.21-30.22 0-4.14 0.83-8.09 2.34-11.69 -1.51-3.6-2.34-7.55-2.34-11.69 0-16.68 13.52-30.21 30.21-30.21 4.59 0 8.94 1.02 12.84 2.86 5.26-8.86 14.93-14.8 25.99-14.8 9.05 0 17.18 3.99 22.71 10.3 2.4-0.61 4.91-0.94 7.5-0.94 16.69 0 30.21 13.53 30.21 30.22C256.043 165.489 254.273 171.119 251.203 175.839z" />
            <g>
              <path fill="none" stroke="#59351C" strokeWidth="1" strokeLinecap="round" d="M160.321 181.962c0 0-1.144-2.095 0.864-5.069" />
              <path fill="#ED6E46" stroke="#ED6E46" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M170.869 192.267c-0.599 6.451-4.196 11.391-8.032 11.034 -0.803-0.075-1.553-0.376-2.229-0.863 -0.575 0.41-1.21 0.676-1.895 0.78 -3.81 0.578-7.685-4.142-8.66-10.546 -0.975-6.405 1.324-12.068 5.132-12.646 1.775-0.27 3.564 0.612 5.07 2.278 1.371-1.623 3.04-2.522 4.756-2.361C168.845 180.301 171.468 185.819 170.869 192.267z" />
            </g>
            <g>
              <path fill="none" stroke="#59351C" strokeWidth="1" strokeLinecap="round" d="M191.058 145.324c0 0-1.209-2.214 0.913-5.356" />
              <path className="apple-top" fill="#ED6E46" stroke="#ED6E46" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M202.205 156.214c-0.633 6.817-4.434 12.038-8.488 11.66 -0.849-0.079-1.641-0.397-2.356-0.912 -0.608 0.433-1.279 0.715-2.002 0.824 -4.026 0.611-8.121-4.377-9.151-11.145 -1.03-6.768 1.4-12.753 5.423-13.364 1.876-0.285 3.766 0.646 5.358 2.408 1.449-1.715 3.213-2.665 5.026-2.495C200.066 143.568 202.838 149.4 202.205 156.214z" />
            </g>
            <g>
              <path fill="none" stroke="#59351C" strokeWidth="1" strokeLinecap="round" d="M226.558 180.564c0 0-1.209-2.214 0.913-5.356" />
              <path className="right-apple" fill="#ED6E46" stroke="#ED6E46" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M237.705 191.454c-0.633 6.817-4.434 12.038-8.488 11.66 -0.849-0.079-1.641-0.397-2.356-0.912 -0.608 0.433-1.279 0.715-2.002 0.824 -4.026 0.611-8.121-4.377-9.151-11.145 -1.03-6.768 1.4-12.753 5.423-13.364 1.876-0.285 3.766 0.646 5.358 2.408 1.449-1.715 3.213-2.665 5.026-2.495C235.566 178.808 238.338 184.64 237.705 191.454z" />
            </g>
          </g>
          <desc>Yellow sun moving from left to right.</desc>
          <circle className="sun" fill="#F9EC48" cx="57" cy="90" r="27" filter="url(#demo5)">
            <animate attributeName="cx" values="57;320;57" dur="10s" repeatCount="indefinite" />
            <animate attributeName="cy" values="100;70;100;70;100" dur="10s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </AppBackGroundWrapper>
  );
});
