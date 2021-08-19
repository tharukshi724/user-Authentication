
import React from 'react'


function Nav() {
    return (
        <div>
            
<nav id="mainNavbar" class="navbar navbar-dark navbar-expand-md py-0 fixed-top">



<button class="navbar-toggler" data-toggle="collapse" data-target="#navLinks" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navLinks">
    <ul class="navbar-nav">

        <li>
            <a class="nav-item nav-link">HOME</a>
        </li>

        <li>
            <a class="nav-item nav-link active-state">SHOP</a>
        </li>
        <li>
            <a  class="nav-item nav-link">DONATE</a>
        </li>

    </ul>



</div>
</nav>
        </div>
    )
}

export default Nav

