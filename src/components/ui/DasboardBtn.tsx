"use client"
import Link from 'next/link';
import React from 'react'
import { Button } from './button';
import { SparklesIcon } from 'lucide-react';
import { useUserRole } from '@/hooks/UseUserRole';

const DasboardBtn = () => {

   

    const {isInterviewer , isCandidate, isLoading} = useUserRole();

    if (isCandidate || isLoading) return null;

  return (
    <Link href={"/dashboard"}>
      <Button className="gap-2 font-medium" size={"sm"}>
        <SparklesIcon className="size-4" />
        Dashboard
      </Button>
    </Link>
  )
}

export default DasboardBtn