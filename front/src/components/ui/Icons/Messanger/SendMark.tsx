import { FC, SVGProps } from "react"

const SendMark: FC<SVGProps<SVGSVGElement>> = ({ ...rest }) => {
  return (
    <svg
      fill="currentColor"
      width="20px"
      height="20px"
      viewBox="0 0 32.00 32.00"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="0.00032"
      transform="rotate(0)"
    >
      <g strokeWidth="0"></g>
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="0.768"
      ></g>
      <g transform="translate(0 0)">
        <path d="M5 16.577l2.194-2.195 5.486 5.484L24.804 7.743 27 9.937l-14.32 14.32z"></path>
      </g>
    </svg>
  )
}

export default SendMark
