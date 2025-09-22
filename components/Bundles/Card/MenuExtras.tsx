import { EyeIcon, InformationCircleIcon } from '@heroicons/react/16/solid'
import React from 'react'

type MenuExtrasProps = {
    options: string[]
}

const MenuExtras = ({ options }: MenuExtrasProps) => {
    return (
        <div className="dropdown dropdown-left dropdown-center">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-square btn-ghost"
            >
                <EyeIcon className="w-6" />
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm"
            >
                {options.map((option, i) => (
                    <li key={i}>
                        <a>
                            <InformationCircleIcon className="w-3 text-info" />
                            {option}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MenuExtras
