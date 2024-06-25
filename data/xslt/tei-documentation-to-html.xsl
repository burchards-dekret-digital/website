<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:tei="http://www.tei-c.org/ns/1.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs tei" version="2.0">
    <xsl:output method="html" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"/>
   
    <!-- Strip spaces from all elements -->
    <xsl:strip-space elements="*"/>
   
    <xsl:template match="/">
        <div id="teiTranskriptionDoc" class="block">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <!-- Only process child elements of 'body' from 'TEI' -->
    <xsl:template match="tei:TEI">
        <xsl:apply-templates select="tei:text/tei:body/*"/>
    </xsl:template>
    
    <!-- Do nothing for 'teiHeader', effectively excluding it from output -->
    <xsl:template match="tei:teiHeader"/>


    <!-- Handle language -->
    <xsl:template match="//tei:body/tei:div/tei:div">
        <xsl:for-each select=".">
            <span lang="{@xml:lang}">
                <xsl:apply-templates/>
            </span>
        </xsl:for-each>
    </xsl:template>
    
    <!-- Handle table -->
    <xsl:template match="//tei:body/tei:div[@xml:id='bdd-documentation-schemaspec']">
        
            <div id="{@xml:id}">
                <xsl:apply-templates/>
            </div>
        
    </xsl:template>

    <!-- Handle head as h1 -->
    <xsl:template match="//tei:body/tei:div/tei:div/tei:div/tei:head">
        <h1>
            <xsl:apply-templates/>
        </h1>
    </xsl:template>
    

<!-- Handle head as h2 -->
    <xsl:template match="//tei:body/tei:div/tei:div/tei:div/tei:div/tei:head">
        <h2>
            <xsl:apply-templates/>
        </h2>
    </xsl:template>


    <!-- Handle p -->
    <xsl:template match="tei:p">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <!-- Handle code elements -->
    <xsl:template match="tei:tag | tei:att | tei:val | tei:gi">
        <code>
            <xsl:apply-templates/>
        </code>
    </xsl:template>

    <!-- Handle ref -->
    <xsl:template match="tei:ref">
        <a href="{@target}" target="_blank">
            <xsl:apply-templates/>
        </a>
    </xsl:template>

    <!-- Handle list -->
    <xsl:template match="tei:list">
        <ul>
            <xsl:apply-templates/>
        </ul>
    </xsl:template>

    <!-- Handle list item -->
    <xsl:template match="tei:item">
        <li>
            <xsl:apply-templates/>
        </li>
    </xsl:template>


    <!-- Handle images -->
    <xsl:template match="//tei:div//tei:figure">
        <div style="text-align: center;">
            <figure class="figure">
                <img src="{tei:graphic/@url}" class="figure-img img-fluid" alt="{tei:figDesc/text()}"/>
                <figcaption class="figure-caption">
                    <xsl:value-of select="./tei:figDesc"/>
                    <!-- TODO: doesn't display link -->
                </figcaption>
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
    
    <xsl:template match="//tei:schemaSpec">
        <div class="accordion" id="accordionDocumentation">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <!-- Table of elements -->
        <xsl:template match="//tei:elementSpec">
            
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse{@ident}" aria-expanded="false" aria-controls="collapse{@ident}">
                      <xsl:value-of select="./@ident"/>
                    </button>
                  </h2>
                  <div id="collapse{@ident}" class="accordion-collapse collapse" data-bs-parent="#accordionDocumentation">
                    <div class="accordion-body">
                        <h3><a href="https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-{@ident}.html" target="_blank"><xsl:value-of select="./@ident"/></a></h3>
                        <table class="table">
                            <thead><tr><th scope="col">Attribut</th><th scope="col">Modus</th><th scope="col">Usage</th><th scope="col">Values</th><th scope="col">Description</th></tr></thead>
                            <xsl:for-each select="./tei:attList/tei:attDef">
                            <tr>
                                <td><xsl:value-of select="./@ident"/></td>
                                <td><xsl:value-of select="./@mode"/></td>
                                <td><xsl:value-of select="./@usage"/></td>
                                <td>
                                    <xsl:for-each select="./tei:valList/tei:valItem">
                                        <code><xsl:value-of select="./@ident"/></code>
                                        <xsl:if test="position() &lt; last()">, </xsl:if>
                                    </xsl:for-each>
                                </td>
                                <td><xsl:value-of select=".//tei:desc"/></td>
                            </tr>
                            </xsl:for-each>
                        </table>
                    </div>
                  </div>
                </div>
              
            
        </xsl:template>
       
</xsl:stylesheet>