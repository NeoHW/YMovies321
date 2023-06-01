import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image';
import companyLogo from "../navigation/YMoviesLogo.jpg";
import avatar from "../navigation/avatar.png";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { signIn } from "../authContext/auth"
import { User, UserCredential } from 'firebase/auth';

export default function Reviews() {
    return (
        <div>
            <div>
                input review block 
            </div>
            <div>
                review view
            </div>
        </div>
    )
}