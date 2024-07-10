'use client'
import {useRouter} from 'next/navigation'
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';

const BackButton = () => {
    const router = useRouter();

    return <Button variant={"ghost"} size={"icon"} onClick={() => router.back()} className="group">
        <ChevronLeft className='h-4 w-4 text-muted-foreground group-hover:text-primary/80 duration-100 transition-all' />
        <span className='hidden md:block text-base text-muted-foreground group-hover:text-primary/80 duration-100 transition-all'>back</span>
    </Button>
}

export default BackButton;