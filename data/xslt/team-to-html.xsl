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
    
    <xsl:template match="//tei:body/tei:div[@xml:id]">
        <div id="{@xml:id}">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
       
    <xsl:template match="//tei:body/tei:div/tei:div">
        <div class="card">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="//tei:body/tei:div/tei:div/tei:div">
        <div class="card-body">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="//tei:body/tei:div/tei:div/tei:div/tei:div">
        <div class="card-text">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="//tei:body/tei:div/tei:div/tei:div/tei:head">
        <h6>
            <xsl:apply-templates/>
        </h6>
    </xsl:template>
    <xsl:template match="//tei:body/tei:div/tei:div/tei:div/tei:head[@type='name']">
        <h5 class="card-title">
            <xsl:apply-templates/>
        </h5>
    </xsl:template>
   
    <!-- Handle p-->
    <xsl:template match="tei:p">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
 
    
    <xsl:template match="tei:email">
        <a href="mailto:{.}">
            <xsl:value-of select="."/>
        </a>
    </xsl:template>

    

    <!-- Handle ref -->
    <xsl:template match="tei:ref">
        <a href="{@target}">
            <xsl:apply-templates/>
        </a>
    </xsl:template>
    
    <xsl:template match="tei:ref[@type]">
        <a href="{@target}" target="_blank">
            <xsl:apply-templates/>
        </a>
    </xsl:template>

    <!-- Handle images -->
    <xsl:template match="tei:graphic">
        <img src="{@url}" class="card-img-top h-100"/>
    </xsl:template>
    
    
    <!-- Handle list -->
    <xsl:template match="tei:list">
        <ul class="list-group list-group-flush">
            <xsl:apply-templates/>
        </ul>
    </xsl:template>

    <!-- Handle list item -->
    <xsl:template match="tei:item">
        <li class="list-group-item">
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