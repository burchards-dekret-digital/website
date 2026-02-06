<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:tei="http://www.tei-c.org/ns/1.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs tei" version="2.0">
    <xsl:output method="html" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"/>
   
    <!-- Strip spaces from all elements -->
    <xsl:strip-space elements="*"/>
    
    <!-- Only process child elements of 'body' from 'TEI' -->
    <xsl:template match="tei:TEI">
        <xsl:apply-templates select="tei:text/tei:body/*"/>
    </xsl:template>
    
    <!-- Do nothing for 'teiHeader', effectively excluding it from output -->
    <xsl:template match="tei:teiHeader"/>
    
    
    <xsl:template match="//tei:body/tei:div[@xml:id='introduction']">
        <div id="{@xml:id}" class="block">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="//tei:body/tei:div[@xml:id='description']">
        <div id="{@xml:id}" class="block">
            <div class="row">
                <xsl:apply-templates/>
            </div>
        </div>
    </xsl:template>
    
    <xsl:template match="//tei:body/tei:div[@xml:id='summaryTable']">
        <div id="{@xml:id}" class="block">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    

    <!-- Handle language -->
    <xsl:template match="tei:div[@xml:lang]">
        <xsl:for-each select=".">
            <span lang="{@xml:lang}">
                <xsl:apply-templates/>
            </span>
        </xsl:for-each>
    </xsl:template>
    
    <xsl:template match="tei:span[@xml:lang]">
        <xsl:for-each select=".">
            <span lang="{@xml:lang}">
               <xsl:apply-templates/>
            </span>
        </xsl:for-each>
    </xsl:template>
    

    <!-- Handle p -->
    <xsl:template match="tei:p">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    <!-- Handle ref -->
    <xsl:template match="tei:ref">
        <a href="{@target}">
            <xsl:apply-templates/>
        </a>
    </xsl:template>
    
    <xsl:template match="tei:div[@type='desc-content']">
        <div class="col-md-9">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    
    
    <xsl:template match="tei:figure">
        <div class="col-md-3 mt-4 mt-md-0 d-flex align-items-center justify-content-center">
            <figure class="figure w-100 m-0">
                <xsl:apply-templates/>
            </figure>
        </div>
    </xsl:template>
    
    <xsl:template match="tei:graphic">
        <img src="{@url}" class="figure-img img-fluid w-100"/>
    </xsl:template>
    
    <xsl:template match="tei:figDesc">
        <figcaption class="figure-caption" lang="{@xml:lang}">
            <xsl:apply-templates/>
        </figcaption>
    </xsl:template>
    

    
    
    <xsl:template match="tei:div[@type='container']">
        <div class="container">
            <div class="row">
                <xsl:apply-templates/>
            </div>
        </div>
    </xsl:template>
    
    <xsl:template match="tei:div[@type='institutions']">
        <div class="col-md-5">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="tei:div[@type='commission']">
        <div class="col-md-3">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="tei:div[@type='individuals']">
        <div class="col-md-4">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    
    <xsl:template match="tei:head">
        <h2>
            <xsl:apply-templates/>
        </h2>
    </xsl:template>
    
    <xsl:template match="tei:head[@type='subtitle']">
        <h3>
            <xsl:apply-templates/>
        </h3>
    </xsl:template>
    
    <xsl:template match="tei:head[@type='partner-subtitle']">
        <h4>
            <xsl:apply-templates/>
        </h4>
    </xsl:template>
    
    <xsl:template match="tei:head[@type='sub-subtitle']">
        <h5>
            <xsl:apply-templates/>
        </h5>
    </xsl:template>
    
    <xsl:template match="tei:email">
        <a href="mailto:{.}">
            <xsl:value-of select="."/>
        </a>
    </xsl:template>
    
    <!-- Handle lists -->
    <xsl:template match="tei:list[@type='bulleted']">
        <ul>
            <xsl:apply-templates/>
        </ul>
    </xsl:template>
    
    <xsl:template match="tei:list[@type='ordered']">
        <ol>
            <xsl:apply-templates/>
        </ol>
    </xsl:template>

    <!-- Handle list item -->
    <xsl:template match="tei:item">
        <li>
            <xsl:apply-templates/>
        </li>
    </xsl:template>
    
    

    <!--hi rend="bold" and italic -->
    <xsl:template match="//tei:hi[@rend='bold']">
        <b>
            <xsl:apply-templates/>
        </b>
    </xsl:template>
    
    <xsl:template match="//tei:hi[@rend='italic']">
        <i>
            <xsl:apply-templates/>
        </i>
    </xsl:template>
</xsl:stylesheet>