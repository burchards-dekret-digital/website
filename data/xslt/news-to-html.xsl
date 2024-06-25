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

    <xsl:template match="//tei:body/tei:div/tei:div">
        <div class="news-item">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    <!-- Handle language -->
    <xsl:template match="tei:span">
        <xsl:for-each select=".">
            <span lang="{@xml:lang}">
                <xsl:apply-templates/>
            </span>
        </xsl:for-each>
    </xsl:template>
    
    <!-- Handle head as h3 -->
    <xsl:template match="tei:head">
        <h3 class="title">
            <xsl:apply-templates/>
        </h3>
    </xsl:template>

    <!-- Handle first p ad as h4 -->
    <xsl:template match="//tei:body/tei:div/tei:div/tei:p[1]">
        <h4 class="date">
            <xsl:apply-templates/>
        </h4>
    </xsl:template>
      
    <!-- Handle div-content -->
    <xsl:template match="//tei:body/tei:div/tei:div/tei:p[2]">
        <div class="content">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    

    <!-- Handle ref -->
    <xsl:template match="tei:ref">
        <a href="{@target}" target="_blank">
            <xsl:apply-templates/>
        </a>
    </xsl:template>

    <!-- Handle images -->
    <xsl:template match="tei:graphic">
        <div style="text-align: center;">
            <figure class="figure">
                <img src="{@url}" class="figure-img img-fluid" alt="{tei:figDesc/text()}"/>
            </figure>
        </div>
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