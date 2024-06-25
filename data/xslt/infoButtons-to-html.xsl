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
    
    
    <xsl:template match="//tei:body/tei:div[@xml:id='infoHandschriften']">
        <div id="{@xml:id}" class="block">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="//tei:body/tei:div[@xml:id='infoSchreibtisch']">
        <div id="{@xml:id}" class="block">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="//tei:body/tei:div[@xml:id='infoStyleTranscriptions']">
        <div id="{@xml:id}" class="block">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    

    <!-- Handle language -->
    <xsl:template match="//tei:body/tei:div/tei:div">
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

    <!-- Handle first p -->
    <xsl:template match="//tei:body/tei:div/tei:div/tei:p[1]">
        <p class="mt-4">
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    <!-- Handle ref -->
    <xsl:template match="tei:ref">
        <a href="{@target}" target="_blank">
            <xsl:apply-templates/>
        </a>
    </xsl:template>
    
    <!-- Handle table -->
    <xsl:template match="tei:table">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">
                        <span lang="de">Phänomen</span>
                        <span lang="en">Phenomenon</span>
                    </th>
                    <th scope="col">
                        <span lang="de">Grafische Darstellung</span>
                        <span lang="en">Graphic representation</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <xsl:apply-templates/>
            </tbody>
            
        </table>
    </xsl:template>
    
    
    <!--<xsl:template match="tei:row[@role='label']">
        <tr>
           <xsl:apply-templates/>
        </tr>
    </xsl:template>-->
    
    <xsl:template match="tei:row">
        <tr>
           <xsl:apply-templates/>
        </tr>
    </xsl:template>
    
    <xsl:template match="tei:cell[@role='label']">
        <td>
           <xsl:apply-templates/>
        </td>
    </xsl:template>
    
    <!--<xsl:template match="tei:row[@role='label']/tei:cell[@role='label']">
        <th scope="col">
           <xsl:apply-templates/>
        </th>
    </xsl:template>-->
    
    <xsl:template match="tei:cell[@role='data']">
        <td class="legendFont">
           <xsl:apply-templates/>
        </td>
    </xsl:template>
    
    
    <xsl:template match="tei:span[@type]">
        <span class="{@type}">
           <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:graphic">
        <img src="{@url}" style="width: 4%"/>
    </xsl:template>
    
    <xsl:template match="tei:figure[@type='eye']">
        <i class="fa-solid fa-eye"/>
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