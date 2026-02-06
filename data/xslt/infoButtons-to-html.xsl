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
    
    <xsl:template match="//tei:body/tei:div[@xml:id='infoDownloadJSON']">
        <div id="{@xml:id}" class="block">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="//tei:body/tei:div[@xml:id='infoNewsArchive']">
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
    
        
        <xsl:template match="tei:span[@type='tei_note-later-marginalia']">
            <span class="{@type}">
                Ex <span class="tei_abbr" style="display:none">c<span class="tei_g">̅</span>cilio</span><span class="tei_expan">concilio</span> habito <br class="tei_lb "/>Gvardastalli <br class="tei_lb "/>a <span class="tei_abbr" style="display:none">sc<span class="tei_g">đ</span>o</span><span class="tei_expan">secundo</span> paschali<span class="tei_g"></span>
            </span>
     </xsl:template>
    
    
    <xsl:template match="tei:span[@type='tei_note-contemporary-interlinear']">
        <span class="{@type}">
            <span class="tei_abbr" style="display:none"><span class="tei_g"></span>s<span class="tei_g"></span></span><span class="tei_expan">scilicet</span> tibi
        </span>
     </xsl:template>
    
    <xsl:template match="tei:graphic">
        <img src="{@url}" style="width: 7%"/>
    </xsl:template>
    
    <xsl:template match="tei:figure[@type='eye']">
        <i class="fa-solid fa-eye"/>
    </xsl:template>
    
    <xsl:template match="tei:figure[@type='prev']">
        <i class="fa-solid fa-arrow-up-long"/>
    </xsl:template>
    
    <xsl:template match="tei:figure[@type='next']">
        <i class="fa-solid fa-arrow-down-long"/>
    </xsl:template>
    
    <xsl:template match="tei:figure[@type='sync']">
        <i class="fa-solid fa-arrows-left-right"/>
    </xsl:template>
    
    <xsl:template match="tei:figure[@type='circle-info']">
        <i class="fa-solid fa-circle-info"/>
    </xsl:template>
    
    <xsl:template match="tei:span[@type='tei_handShift-wrapper']">
        <span class="tei_handShift-wrapper" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="&lt;span lang='de'&gt;Informationen zum Schreiber.&lt;/span&gt;&lt;span lang='en'&gt;Information on the scribe.&lt;/span&gt;">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:figure[@type='taxonomy']">
         <span class="taxonomy-icon" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="&lt;span lang='de'&gt;Informationen zur Taxonomie.&lt;/span&gt;&lt;span lang='en'&gt;Information on taxonomy.&lt;/span&gt;">
            <i class="fa-solid fa-tag fa-lg"/>
         </span>
    </xsl:template>
    
    
    <xsl:template match="tei:span[@type='editorial-comment']">
        <span class="tei_note-editorial-comment-icon" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="&lt;span lang='de'&gt;Redaktioneller Kommentar.&lt;/span&gt;&lt;span lang='en'&gt;Editorial comment.&lt;/span&gt;">
            <i class="fa-solid fa-circle-info"/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:span[@type='tei_erasure-visible']">
        <span class="tei_erasure-visible" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="&lt;span lang='de'&gt;Rasur&lt;/span&gt;&lt;span lang='en'&gt;Erasure&lt;/span&gt;">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:span[@type='tei_del-correction']">
        <span class="tei_del-correction" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="&lt;span lang='de'&gt;Korrektur&lt;/span&gt;&lt;span lang='en'&gt;Correction&lt;/span&gt;">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
    <xsl:template match="tei:span[@type='tei_del-expunctuation']">
        <span class="tei_del-expunctuation" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="&lt;span lang='de'&gt;Expunktion&lt;/span&gt;&lt;span lang='en'&gt;Expunctuation&lt;/span&gt;">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    
     <xsl:template match="//damage//gap[@reason='trimmed']">
        <span class="tei_damage-trimmed" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="&lt;span lang='de'&gt;Beschädigung: beschnitten&lt;/span&gt;&lt;span lang='en'&gt;Damage: trimmed&lt;/span&gt;">
           <xsl:apply-templates/>
           </span>
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
    
    <!-- Handle TEI lists -->
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

<xsl:template match="tei:item">
  <li>
    <xsl:apply-templates/>
  </li>
</xsl:template>


</xsl:stylesheet>